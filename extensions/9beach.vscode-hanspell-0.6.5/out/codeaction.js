"use strict";
/**
 * Defines `HanspellCodeAction` class.
 *
 * `HanspellTypo` makes `HanspellDiagnostic` makes `HanspellCodeAction`.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.HanspellCodeAction = void 0;
const vscode = require("vscode");
const diagnostics_1 = require("./diagnostics");
/**
 * Provides code actions for the commands of `vscode-hanspell.fixTypo` and
 * `vscode-hanspell.fixAllTypos`.
 */
class HanspellCodeAction {
    provideCodeActions(document, _range, context, _token) {
        let actions = [];
        const ignores = [];
        const hanspellDiagnostics = context.diagnostics.filter((diagnostic) => diagnostic.code === diagnostics_1.HANSPELL_MENTION);
        if (!hanspellDiagnostics.length) {
            return [];
        }
        hanspellDiagnostics.forEach((diagnostic) => {
            actions = actions.concat(this.createFixTypoCommandCodeActions(diagnostic, document));
            if (diagnostic.typo.token) {
                ignores.push(this.createIgnoreTypoCommandCodeAction(diagnostic.typo.token, document));
            }
        });
        actions = actions.concat(ignores);
        if (!actions.length) {
            return actions;
        }
        if (hanspellDiagnostics.some((diagnostic) => diagnostic.typo.isCommon === true)) {
            const action = new vscode.CodeAction('다음, 부산대 공통 오류만 모두 교정', vscode.CodeActionKind.QuickFix);
            action.command = {
                command: 'vscode-hanspell.fixCommonTypos',
                title: 'Fix common typos',
                arguments: [{ document }],
            };
            actions.push(action);
        }
        const action = new vscode.CodeAction('맞춤법 오류 모두 교정', vscode.CodeActionKind.QuickFix);
        action.command = {
            command: 'vscode-hanspell.fixAllTypos',
            title: 'Fix all typos',
            arguments: [{ document }],
        };
        actions.push(action);
        return actions;
    }
    createFixTypoCommandCodeActions(diagnostic, document) {
        const actions = [];
        diagnostic.suggestions.forEach((suggestion) => {
            const action = new vscode.CodeAction(`⤷ ${suggestion}`, vscode.CodeActionKind.QuickFix);
            action.command = {
                command: 'vscode-hanspell.fixTypo',
                title: 'Fix a typo',
                arguments: [
                    {
                        document,
                        suggestion,
                        token: diagnostic.token,
                        range: diagnostic.range,
                    },
                ],
            };
            actions.push(action);
        });
        if (actions.length) {
            actions[0].isPreferred = true;
        }
        return actions;
    }
    createIgnoreTypoCommandCodeAction(token, document) {
        const action = new vscode.CodeAction(`사전에 추가: “${token}”`, vscode.CodeActionKind.QuickFix);
        action.command = {
            command: 'vscode-hanspell.ignoreTypo',
            title: 'Ignore a typo',
            arguments: [
                {
                    document,
                    token,
                },
            ],
        };
        return action;
    }
}
exports.HanspellCodeAction = HanspellCodeAction;
HanspellCodeAction.providedCodeActionKinds = [
    vscode.CodeActionKind.QuickFix,
];
//# sourceMappingURL=codeaction.js.map