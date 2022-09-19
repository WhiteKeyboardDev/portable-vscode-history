"use strict";
/** Defines `HanspellIgnore` class. */
Object.defineProperty(exports, "__esModule", { value: true });
exports.HanspellIgnore = void 0;
const fs = require("fs");
const minimatch_1 = require("minimatch");
/**
 * `HanspellIgnore` class having glob patterns to match typo tokens. If a token
 * is matched to a glob pattern, it's ignored.
 */
class HanspellIgnore {
    constructor() {
        /** Checks if token matches content of `.hanspell-ignore` */
        this.match = (token) => this.myMatches.match(token) || !token.match(HanspellIgnore.hangul);
        /** Checks if valid content of `.hanspell-ignore` is empty */
        this.empty = () => this.myMatches.empty;
        this.myMatches = HanspellIgnore.get();
    }
    /** Checks if the last char of the content of `.hanspell-ignore` is '\n'. */
    static needLN() {
        const matches = HanspellIgnore.get();
        if (matches.empty ||
            matches.pattern.lastIndexOf(',}') === matches.pattern.length - 2) {
            return false;
        }
        return true;
    }
    /** Reads glob patterns in `.hanspell-ignore`. */
    static get() {
        try {
            const stat = fs.statSync(HanspellIgnore.path);
            if (stat === undefined) {
                HanspellIgnore.matches = HanspellIgnore.emptyMatches;
                return HanspellIgnore.matches;
            }
            if (HanspellIgnore.lastModified === stat.mtimeMs) {
                return HanspellIgnore.matches;
            }
            HanspellIgnore.lastModified = stat.mtimeMs;
            // '이딸리아*\n톨스또이\n' => '{이딸리아*,톨스또이*,}'.
            const ignores = `{${fs
                .readFileSync(HanspellIgnore.path, 'utf8')
                .replace(/[,{}]/g, '\\$&')
                .replace(/\n\n*/g, ',')}}`;
            if (ignores.length >= 3) {
                HanspellIgnore.matches = new minimatch_1.Minimatch(ignores);
            }
            else {
                HanspellIgnore.matches = HanspellIgnore.emptyMatches;
            }
        }
        catch (err) {
            console.log(err.message);
            HanspellIgnore.matches = HanspellIgnore.emptyMatches;
        }
        return HanspellIgnore.matches;
    }
}
exports.HanspellIgnore = HanspellIgnore;
/** Used to check if at least one hangul character exists. */
HanspellIgnore.hangul = /[ㄱ-ㅎㅏ-ㅣ가-힣]/;
/** File path of `.hanspell-ignore` */
HanspellIgnore.path = `${process.env.HOME || process.env.USERPROFILE}/.hanspell-ignore`;
/** Glob patterns in `.hanspell-ignore`. */
HanspellIgnore.emptyMatches = new minimatch_1.Minimatch('');
HanspellIgnore.matches = HanspellIgnore.emptyMatches;
/** Last modified time of `.hanspell-ignore` */
HanspellIgnore.lastModified = -1;
/** Adds a glob pattern to the end of file */
HanspellIgnore.append = (pattern) => {
    fs.writeFileSync(HanspellIgnore.path, HanspellIgnore.needLN() ? `\n${pattern}\n` : `${pattern}\n`, { flag: 'a' });
};
//# sourceMappingURL=ignore.js.map