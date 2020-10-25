const config = require("./config.json");

/**
 * @typedef {Class} Output
 */
module.exports = class {
    constructor() {
        this.out = [];
        this.df = [];
        this.debug = [];
        return this;
    }

    addOutput (...args) {
        this.out.push(...args);
        return this;
    }

    dfIO (...args) {
        this.df.push(...args);
    }

    addDf (...args) {
        this.dfIO(...args);
        return this;
    }

    addDebug (...args) {
        if (config.debug) {
            this.debug.push(...args);
        }
        return this;
    }

    get object () {
        return this.convert();
    }

    convert () {
        return {
            df : this.df,
            out : this.out,
            debug : this.debug
        }
    }
}