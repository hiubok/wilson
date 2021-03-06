
const Wikipedia = require("../api/wikipedia.js");

const config = require("../config.json");

module.exports = async name => {
    let res = await Wikipedia.search(name);

    if (!res) {
        return;
    }

    if (res.error) {
        console.error(`ERR: ${res.error.code} (@bot/srcs/wikipedia.js)`);
        return;
    }

    if (res.query.searchinfo.totalhits === 0) {
        return;
    }

    let id = Wikipedia.getId(res);
    let article = Wikipedia.getPage(await Wikipedia.article(id));
    let extract = Wikipedia.getPage(await Wikipedia.extract(id));

    return {
        id: article.pageid,
        url: [ article.fullurl ],
        src: "Wikipedia",
        name: article.title,
        description: Wikipedia.getFirstParagraph(extract).split(/\.(?!\s)|\n/).slice(0, config.wikipedia.maxParagraphs),
    };
};