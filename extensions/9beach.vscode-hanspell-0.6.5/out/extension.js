"use strict";
/**
 * Defines the functions for the code action commands, and registers all the
 * commands and `refreshDiagnostics`.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.activate = void 0;
const vscode = require("vscode");
const spellcheck_1 = require("./spellcheck");
const ignore_1 = require("./ignore");
const history_1 = require("./history");
const codeaction_1 = require("./codeaction");
const spellcheck_commands_1 = require("./spellcheck-commands");
const diagnostics_1 = require("./diagnostics");
/** Called once the extension is activated. */
function activate(context) {
    history_1.HanspellHistory.backupIfTooLarge();
    // Subscribes `refreshDiagnostics` to documents change events.
    diagnostics_1.subscribeDiagnosticsToDocumentChanges(context);
    // Registers the code actions for `vscode-hanspell.fixTypo`,
    // `vscode-hanspell.fixAllTypos`, and `vscode-hanspell.fixCommonTypos`.
    context.subscriptions.push(vscode.languages.registerCodeActionsProvider('*', new codeaction_1.HanspellCodeAction(), { providedCodeActionKinds: codeaction_1.HanspellCodeAction.providedCodeActionKinds }));
    // Binds code action commands to corresponding functions.
    context.subscriptions.push(vscode.commands.registerCommand('vscode-hanspell.fixTypo', fixTypo));
    context.subscriptions.push(vscode.commands.registerCommand('vscode-hanspell.ignoreTypo', ignoreTypo));
    context.subscriptions.push(vscode.commands.registerCommand('vscode-hanspell.fixAllTypos', fixAllTypos));
    context.subscriptions.push(vscode.commands.registerCommand('vscode-hanspell.fixCommonTypos', fixCommonTypos));
    // Binds commands to corresponding functions.
    context.subscriptions.push(vscode.commands.registerCommand('vscode-hanspell.spellCheckByDAUM', spellcheck_commands_1.spellCheckByDAUM));
    context.subscriptions.push(vscode.commands.registerCommand('vscode-hanspell.spellCheckByPNU', spellcheck_commands_1.spellCheckByPNU));
    context.subscriptions.push(vscode.commands.registerCommand('vscode-hanspell.spellCheckByAll', spellcheck_commands_1.spellCheckByAll));
}
exports.activate = activate;
/**
 * Fixes the typo of the given range of the document.
 *
 * Called by `vscode-hanspell.fixTypo` code action command.
 */
function fixTypo(args) {
    const edit = new vscode.WorkspaceEdit();
    edit.replace(args.document.uri, args.range, args.suggestion);
    history_1.HanspellHistory.writeOnce(`${args.token} -> ${args.suggestion}\n`);
    vscode.workspace.applyEdit(edit);
}
/**
 * Adds given token to `~/.hanspell-ignore`).
 *
 * Called by `vscode-hanspell.ignoreTypo` code action command.
 */
function ignoreTypo(args) {
    ignore_1.HanspellIgnore.append(args.token);
    const typos = spellcheck_1.DocumentsToTypos.getTypos(args.document);
    spellcheck_1.DocumentsToTypos.setTypos(args.document, typos.filter((typo) => typo.token !== args.token));
    diagnostics_1.refreshDiagnostics(args.document);
}
/**
 * Fixes all the typos of the document.
 *
 * Called by `vscode-hanspell.fixAllTypos` code action command.
 */
function fixAllTypos(args) {
    const edit = new vscode.WorkspaceEdit();
    const uri = args.document.uri;
    const hist = new history_1.HanspellHistory();
    diagnostics_1.getHanspellDiagnostics(args.document).forEach((diagnostic) => {
        if (!diagnostic.suggestions.length) {
            return;
        }
        edit.replace(uri, diagnostic.range, diagnostic.suggestions[0]);
        hist.write(`${diagnostic.token} -> ${diagnostic.suggestions[0]}\n`);
    });
    vscode.workspace.applyEdit(edit);
    hist.end();
}
/**
 * Fixes all the typos of the document common in PNU and DAUM services.
 *
 * Called by `vscode-hanspell.fixCommonTypos` code action command.
 */
function fixCommonTypos(args) {
    const edit = new vscode.WorkspaceEdit();
    const uri = args.document.uri;
    const hist = new history_1.HanspellHistory();
    diagnostics_1.getHanspellDiagnostics(args.document).forEach((diagnostic) => {
        if (!diagnostic.suggestions.length || !diagnostic.typo.isCommon) {
            return;
        }
        edit.replace(uri, diagnostic.range, diagnostic.suggestions[0]);
        hist.write(`${diagnostic.token} -> ${diagnostic.suggestions[0]}\n`);
    });
    vscode.workspace.applyEdit(edit);
    hist.end();
}
//# sourceMappingURL=extension.js.map