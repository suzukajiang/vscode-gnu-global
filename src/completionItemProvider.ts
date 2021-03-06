import * as vscode from 'vscode';
import Global from './global/global';
import Configuration from './configuration'
import {BoolOption} from './configuration'

export default class GlobalCompletionItemProvider implements vscode.CompletionItemProvider {
    global: Global;
    configuration: Configuration;

    constructor(global: Global, configuration: Configuration) {
        this.global = global;
        this.configuration = configuration;
    }

    provideCompletionItems(document: vscode.TextDocument, position: vscode.Position,
                                  token: vscode.CancellationToken, context: vscode.CompletionContext)
                                  : vscode.ProviderResult<vscode.CompletionItem[] | vscode.CompletionList> {
        var self = this;
        return new Promise<vscode.CompletionItem[]>((resolve, reject) => {
            try {
                const mode = this.configuration.getCompletionMode(document.uri);
                if (mode !== BoolOption.Enabled)
                    return reject();
                resolve(self.global.provideCompletionItems(document, position));
            } catch (e) {
                return reject(e);
            }
        });
	}
}