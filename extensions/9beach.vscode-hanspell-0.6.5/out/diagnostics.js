"use strict";
/**
 * Defines diagnostic data structure containing a typo for a range of a
 * document.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.subscribeDiagnosticsToDocumentChanges = exports.HanspellDiagnostic = exports.refreshDiagnostics = exports.getHanspellDiagnostics = exports.HANSPELL_MENTION = void 0;
const vscode = require("vscode");
const spellcheck_1 = require("./spellcheck");
/**
 * Used to associate diagnostic entries with code actions.
 */
exports.HANSPELL_MENTION = 'hanspell';
/** Dictionary of `vscode.TextDocument` to `HanspellDiagnostic[]`. */
const hanspellDiagnostics = vscode.languages.createDiagnosticCollection('hanspell');
/** Returns the diagnostics for the given document. */
function getHanspellDiagnostics(doc) {
    return hanspellDiagnostics.get(doc.uri);
}
exports.getHanspellDiagnostics = getHanspellDiagnostics;
/**
 * Makes the diagnostics out of typos of document.
 *
 * Automatically called when the document is edited.
 */
function refreshDiagnostics(doc) {
    const typos = spellcheck_1.DocumentsToTypos.getTypos(doc);
    if (!typos) {
        return;
    }
    const diagnostics = [];
    typos.forEach((typo) => {
        if (typo.regex === undefined) {
            console.error(typo.token);
            return;
        }
        typo.regex.lastIndex = 0;
        for (let lineIndex = 0; lineIndex < doc.lineCount; lineIndex++) {
            const line = doc.lineAt(lineIndex).text;
            let matched;
            while ((matched = typo.regex.exec(line))) {
                diagnostics.push(new HanspellDiagnostic(new vscode.Range(lineIndex, typo.regex.lastIndex - matched[0].length, lineIndex, typo.regex.lastIndex), typo, matched));
            }
        }
    });
    hanspellDiagnostics.set(doc.uri, diagnostics);
}
exports.refreshDiagnostics = refreshDiagnostics;
const regexpvars = [
    /\$0\b/g,
    /\$1\b/g,
    /\$2\b/g,
    /\$3\b/g,
    /\$4\b/g,
    /\$5\b/g,
    /\$6\b/g,
    /\$7\b/g,
    /\$8\b/g,
    /\$9\b/g,
];
/** Diagnostic data structure containing a typo for a range of a document. */
class HanspellDiagnostic extends vscode.Diagnostic {
    constructor(range, typo, matched) {
        super(range, typo.info, typo.severity !== undefined
            ? typo.severity
            : typo.isCommon !== false
                ? vscode.DiagnosticSeverity.Warning
                : vscode.DiagnosticSeverity.Information);
        this.typo = typo;
        this.code = exports.HANSPELL_MENTION;
        // If the typo from `~/.hanspell-bad-expressions.json`.
        if (!typo.token) {
            this.token = matched[0];
            this.suggestions = [];
            typo.suggestions.forEach((s) => {
                matched.forEach((m, i) => {
                    if (i < 10) {
                        s = s.replace(regexpvars[i], m);
                    }
                });
                this.suggestions.push(s);
            });
        }
        else {
            this.token = typo.token;
            this.suggestions = typo.suggestions;
        }
    }
}
exports.HanspellDiagnostic = HanspellDiagnostic;
/** Subscribes `refreshDiagnostics` to documents change events. */
function subscribeDiagnosticsToDocumentChanges(context) {
    context.subscriptions.push(hanspellDiagnostics);
    if (vscode.window.activeTextEditor) {
        refreshDiagnostics(vscode.window.activeTextEditor.document);
    }
    context.subscriptions.push(vscode.window.onDidChangeActiveTextEditor((editor) => {
        if (editor) {
            refreshDiagnostics(editor.document);
        }
    }));
    context.subscriptions.push(vscode.workspace.onDidChangeTextDocument((editor) => refreshDiagnostics(editor.document)));
    context.subscriptions.push(vscode.workspace.onDidCloseTextDocument((doc) => hanspellDiagnostics.delete(doc.uri)));
}
exports.subscribeDiagnosticsToDocumentChanges = subscribeDiagnosticsToDocumentChanges;
//# sourceMappingURL=diagnostics.js.map