"use strict";
/** Defines `HanspellHistory` class. */
Object.defineProperty(exports, "__esModule", { value: true });
exports.HanspellHistory = void 0;
const fs = require("fs");
/** `HanspellHistory` class providing log writing. */
class HanspellHistory {
    constructor() {
        this.stream = fs.createWriteStream(HanspellHistory.path, {
            flags: 'a',
        });
    }
    write(log) {
        return this.stream.write(log);
    }
    end() {
        this.stream.end();
    }
    static writeOnce(log) {
        fs.writeFile(HanspellHistory.path, log, { flag: 'a' }, (_) => { });
    }
    /**
     * Stats history file size, and renames it to a backup file when it is too
     * large.
     */
    static backupIfTooLarge() {
        try {
            const stat = fs.statSync(HanspellHistory.path);
            if (stat === undefined) {
                return;
            }
            if (stat.size > 10 * 1024 * 1024) {
                for (let i = 1; i < 10000; ++i) {
                    const newPath = `${HanspellHistory.path}.${i}`;
                    if (!fs.existsSync(newPath)) {
                        fs.rename(HanspellHistory.path, newPath, (_) => { });
                        return;
                    }
                }
            }
        }
        catch (err) { }
    }
}
exports.HanspellHistory = HanspellHistory;
/** File path of `.hanspell-history` */
HanspellHistory.path = `${process.env.HOME || process.env.USERPROFILE}/.hanspell-history`;
//# sourceMappingURL=history.js.map