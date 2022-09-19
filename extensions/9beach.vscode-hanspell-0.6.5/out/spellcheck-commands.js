"use strict";
/** Defines the functions for spellcheck-related commands. */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.spellCheckByAll = exports.spellCheckByDAUM = exports.spellCheckByPNU = void 0;
const vscode = require("vscode");
const diagnostics_1 = require("./diagnostics");
const spellcheck_1 = require("./spellcheck");
const service_1 = require("./service");
/** Spell checks the active document by PNU service. */
const spellCheckByPNU = () => spellCheckWithProgress('맞춤법 검사 (부산대)', service_1.SpellCheckService.pnu);
exports.spellCheckByPNU = spellCheckByPNU;
/** Spell checks the active document by DAUM service. */
const spellCheckByDAUM = () => spellCheckWithProgress('맞춤법 검사 (다음)', service_1.SpellCheckService.daum);
exports.spellCheckByDAUM = spellCheckByDAUM;
/** Spell checks the active document by PNU and DAUM service. */
const spellCheckByAll = () => spellCheckWithProgress('맞춤법 검사', service_1.SpellCheckService.all);
exports.spellCheckByAll = spellCheckByAll;
/** Calls `spellCheck()` with progress bar, and `refreshDiagnostics()`. */
function spellCheckWithProgress(title, service) {
    const editor = vscode.window.activeTextEditor;
    vscode.window.withProgress({
        location: vscode.ProgressLocation.Notification,
        title: editor ? title : '맞춤법을 검사할 문서가 없습니다.',
        cancellable: true,
    }, () => __awaiter(this, void 0, void 0, function* () {
        if (editor) {
            try {
                yield spellcheck_1.spellCheck(editor, service);
            }
            catch (err) {
                vscode.window.showInformationMessage(err);
            }
            diagnostics_1.refreshDiagnostics(editor.document);
        }
    }));
}
//# sourceMappingURL=spellcheck-commands.js.map