import { BusinessEmpireData } from "./components/Theme";
import { chanceCards } from "./components/cards";
import { logger } from "./components/logger";
export class Player {
  name;
  money;
  properties;
  image;
  position; 
  color;
  hasLost;
  constructor(name, initialMoney, properties, image, color, startPosition = 1, hasLost = false) {
    this.name = name;
    this.money = initialMoney;
    this.properties = properties;
    this.image = image;
    this.position = startPosition;
    this.color = color;
    this.hasLost = hasLost;
  }

  async move(steps, totalSquares, properties) {

    if (this.inJail && this.jailTurnsLeft > 0) {
      logger.log(`${this.name} jest w więzieniu. Tura anulowana.`);
      this.jailTurnsLeft--;
      return;
    }

    const oldPosition = this.position;
    const newPosition = this.position + steps;

    if (newPosition > totalSquares) {
      this.position = newPosition % totalSquares;
      this.position = this.position === 0 ? totalSquares : this.position;
      this.money += 200;
      logger.log(`${this.name} przechodzi przez Start i pobiera $200.`);
    } else {
      this.position = newPosition;

    }

    
    const property = properties.get(this.position);
    if (property && property.name === 'Podatek') {
      const taxAmount = 70 * this.properties.length;
      if (this.money >= taxAmount) {
        this.money -= taxAmount;
        logger.log(`${this.name} zapłacił $${taxAmount} za wylądowanie na podatku!`);
      } else {
        logger.log(`${this.name} nie ma wystarczających funduszy $${taxAmount} by zapłacić podatek.`);
        this.handleInsufficientFunds(taxAmount, properties);
      }
    }else if (property && property.name === 'Szansa') {
      this.drawChanceCard(this);
    }
    if (property && property.name === 'Wiezienie') {
        setTimeout(() => {
          logger.log(`${this.name} został zabrany do więzienia.`);
        }, 1000); 
        this.position = 11; 
        this.inJail = true;
        this.jailTurnsLeft = 1;
        
    }

    if (property) {
      if (property.owner && property.owner !== this) {
        if (this.money >= property.rent) {
          this.money -= property.rent;
          property.owner.money += property.rent;
          logger.log(`${this.name} zapłacił $${property.rent} dla ${property.owner.name} za wylądowanie na ${property.name}.`);
        } else {
          logger.log(`${this.name} nie ma wystarczających funduszy $${property.rent} by zapłacić za ${property.name}.`);
          this.handleInsufficientFunds(property.rent, properties, property.owner);
        }
      } else if (!property.owner) {
        
        logger.log(`${this.name} wylądował na dostępnej posiadłości: ${property.name}.`);
        
      }
    }

  }

  handleInsufficientFunds(amountNeeded, properties, owner = null) {
    while (this.money < amountNeeded && this.properties.length > 0) {
      this.sellProperty(properties);
    }

    if (this.money < amountNeeded && this.properties.length === 0) {
      this.hasLost = true;
      logger.log(`${this.name} przegrał grę i nie będzie rzucał ponownie`);
    } else if (owner) {
      this.money -= amountNeeded;
      owner.money += amountNeeded;
      logger.log(`${this.name} sprzedał posiadłości i zapłacił $${amountNeeded} dla ${owner.name}.`);
    } else {
      this.money -= amountNeeded;
      logger.log(`${this.name} sprzedał posiadłości i zapłacił $${amountNeeded} w podatkach.`);
    }
  }

  sellProperty(properties) {
    const propertyName = this.properties.pop();
    const propertyId = [...properties.entries()].find(([id, prop]) => prop.name === propertyName)[0];
    const propertyToSell = properties.get(propertyId);
    this.money += 100; // Assume selling price is 50% of the purchase price
    propertyToSell.owner = null;
    propertyToSell.ownerColor = "#FFFFFF"; // Reset property color to white
    BusinessEmpireData.set(propertyId, propertyToSell); // Update BusinessEmpireData
  }
  
  handleNegativeBalance(player) {
    logger.log(`${player.name} ma ujemny bilans $${player.money} po dobraniu karty.`);
    this.handleInsufficientFunds(0, properties); // Ensure the player has non-negative balance

    if (player.money < 0) {
      player.hasLost = true;
      logger.log(`${player.name} przegrał grę z powodu ujemnego balansu.`);
    }
  }

  drawChanceCard(player) {
    const card = chanceCards[Math.floor(Math.random() * chanceCards.length)];
    logger.log(`${player.name} pobrał kartę szansy: ${card.description}`);
    card.effect(player);
    if (player.money < 0) {
      this.handleNegativeBalance(player);
    }
  }
  buyProperty(propertyId, properties) {
    const property = properties.get(propertyId);
    if (property && !property.owner && this.money >= property.price) {
      
      property.owner = this;
      this.properties.push(property.name);
      this.money -= property.price;
      logger.log(`${this.name} kupił ${property.name} za $${property.price}.`);
      property.ownerColor = this.color;
      BusinessEmpireData.set(propertyId, property);
      return true;
    } else {
      logger.log(`${this.name} nie może kupić ${property.name} ponieważ jest już kupione albo nie ma wystarczająco funduszy.`);
      return false;
    }
  }

  

}