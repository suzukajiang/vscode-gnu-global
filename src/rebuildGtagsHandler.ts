import * as vscode from 'vscode';
import Gtags from './global/gtags';

export default class GlobalRebuildGtags {
    gtags: Gtags;

    constructor(gtags: Gtags) {
        this.gtags = gtags;
    }

    rebuildGtags() {
        let folders = vscode.workspace.workspaceFolders;
        if (!folders) {
            return;
        }

        let errors = [];
        for (let folder of folders) {
            try {
                this.gtags.rebuildTags(folder.uri);
            } catch (e) {
                errors.push(folder.name);
            }
        }

        if (0 == errors.length) {
            vscode.window.showInformationMessage('Build tag files successfully');
        } else {
            vscode.window.showErrorMessage("Failed to build tag files: " + errors);
        }
    }
}