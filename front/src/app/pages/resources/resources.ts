import { Component, OnInit, signal } from '@angular/core';
import { Tree } from 'primeng/tree';
import { ContextMenu } from 'primeng/contextmenu';
import { MenuItem, MessageService, TreeNode } from 'primeng/api';
import { NodeService } from '@/pages/resources/nodeService';
import { ToastService } from '@/services/toast.service';
import {Button} from "primeng/button";

@Component({
    selector: 'app-resources',
    imports: [Tree, ContextMenu, Button],
    providers: [NodeService],
    templateUrl: './resources.html',
    styleUrl: './resources.scss'
})
export class Resources implements OnInit {
    // @ts-ignore
    files = signal<TreeNode[]>(undefined);

    selectedFile!: TreeNode | null;

    items!: MenuItem[];

    constructor(
        private nodeService: NodeService,
        private toastService: ToastService
    ) {}

    ngOnInit() {
        this.nodeService.getFiles().then((data) => {
            this.files.set(data);
        });

        this.collapseAll();
        this.items = [
            { label: 'View', icon: 'pi pi-search', command: (event) => this.nodeSelect(event) },
            { label: 'Unselect', icon: 'pi pi-times', command: (event) => this.nodeUnselect(event) }
        ];
    }

    expandAll() {
        this.files().forEach((node) => {
            this.expandRecursive(node, true);
        });
    }

    collapseAll() {
        this.files().forEach((node) => {
            this.expandRecursive(node, false);
        });
    }

    private expandRecursive(node: TreeNode, isExpand: boolean) {
        node.expanded = isExpand;
        if (node.children) {
            node.children.forEach((childNode) => {
                this.expandRecursive(childNode, isExpand);
            });
        }
    }

    nodeSelect(event: any) {
        this.toastService.success('Baixando o arquivo!');
    }

    nodeUnselect(event: any) {}
}
