class Logger {
    constructor() {
      this.logs = [];
      this.callback = null;
    }
  
    setCallback(callback) {
      this.callback = callback;
    }
  
    log(message) {
      this.logs.push(message);
      if (this.callback) {
        this.callback(this.logs);
      }
    }
  
    clear() {
      this.logs = [];
      if (this.callback) {
        this.callback(this.logs);
      }
    }
  }
  
  export const logger = new Logger();