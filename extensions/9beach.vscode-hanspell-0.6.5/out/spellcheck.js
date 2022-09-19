"use strict";
/** Defines `DocumentsToTypos` class and `spellCheck()` function. */
Object.defineProperty(exports, "__esModule", { value: true });
exports.spellCheck = exports.DocumentsToTypos = void 0;
const hanspell = require('hanspell');
const service_1 = require("./service");
const uniq_1 = require("./uniq");
const ignore_1 = require("./ignore");
const typo_db_1 = require("./typo-db");
const bad_expressions_1 = require("./bad-expressions");
/** Class for dictionary of `vscode.TextDocument` to `HanspellTypo[]`. */
class DocumentsToTypos {
}
exports.DocumentsToTypos = DocumentsToTypos;
/** Dictionary of `vscode.TextDocument` to `HanspellTypo[]`. */
DocumentsToTypos.docs2typos = new WeakMap();
/** Gets typos of the document. */
DocumentsToTypos.getTypos = (doc) => DocumentsToTypos.docs2typos.get(doc);
/** Sets typos of the document. */
DocumentsToTypos.setTypos = (doc, typos) => DocumentsToTypos.docs2typos.set(doc, typos);
/**
 * Spell checks given document, makes `HanspellTypo[]`, and sets them to
 * `DocumentsToTypos`.
 */
function spellCheck(editor, service) {
    const doc = editor.document;
    const text = doc.getText(editor.selection.isEmpty ? undefined : editor.selection);
    return new Promise((resolve, reject) => {
        let typos = [];
        let pnuFailed = false;
        function spellCheckDid(response) {
            if (service !== service_1.SpellCheckService.pnu) {
                response.forEach((typo) => {
                    /** PNU service has good `typo.info`, but DAUM service does not. */
                    if (typo.info) {
                        return;
                    }
                    else if (typo.type === 'space') {
                        typo.info = '띄어쓰기 오류';
                    }
                    else if (typo.type === 'doubt') {
                        typo.info = '오류 의심';
                    }
                    else if (typo.type === 'space_spell') {
                        typo.info = '맞춤법/띄어쓰기 오류';
                    }
                    else if (typo.type === 'spell') {
                        typo.info = '맞춤법 오류';
                    }
                    else {
                        typo.info = '맞춤법 오류';
                        console.log(`새로운 오류 타입 발견: ${typo.type}`);
                    }
                });
            }
            typos = typos.concat(response);
        }
        function spellCheckFinished() {
            const ignore = new ignore_1.HanspellIgnore();
            typos = ignore.empty()
                ? typos
                : typos.filter((typo) => !ignore.match(typo.token));
            typos = bad_expressions_1.HanspellBadExpressions.getTypos().concat(uniq_1.uniq(typo_db_1.HanspellTypoDB.getTypos().concat(typos), service));
            DocumentsToTypos.setTypos(doc, typos);
            if (pnuFailed) {
                reject('부산대 서비스 접속 오류로 일부 문장은 교정하지 못했습니다.');
            }
            else {
                resolve('맞춤법 검사를 마쳤습니다.');
            }
        }
        const HTTP_TIMEOUT = 20000;
        switch (service) {
            case service_1.SpellCheckService.pnu:
                hanspell.spellCheckByPNU(text, HTTP_TIMEOUT, spellCheckDid, spellCheckFinished, () => {
                    pnuFailed = true;
                });
                break;
            case service_1.SpellCheckService.daum:
                hanspell.spellCheckByDAUM(text, HTTP_TIMEOUT, spellCheckDid, spellCheckFinished, () => reject('다음 서비스 접속 오류로 맞춤법 교정에 실패했습니다.'));
                break;
            default:
                hanspell.spellCheckByPNU(text, HTTP_TIMEOUT, spellCheckDid, () => {
                    hanspell.spellCheckByDAUM(text, HTTP_TIMEOUT, spellCheckDid, spellCheckFinished, () => reject('다음 서비스 접속 오류로 맞춤법 교정에 실패했습니다.'));
                }, () => {
                    pnuFailed = true;
                });
                break;
        }
    });
}
exports.spellCheck = spellCheck;
//# sourceMappingURL=spellcheck.js.map