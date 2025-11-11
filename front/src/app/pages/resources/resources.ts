import {Component, OnInit, signal} from '@angular/core';
import {Tree} from 'primeng/tree';
import {ContextMenu} from 'primeng/contextmenu';
import {MenuItem, TreeNode} from 'primeng/api';
import {NodeService, ResourceData, ResourceFile} from '@/pages/resources/nodeService';
import {ToastService} from '@/services/toast.service';
import {Button} from 'primeng/button';
import {Dialog} from 'primeng/dialog';
import {InputText} from 'primeng/inputtext';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';

@Component({
    selector: 'app-resources',
    imports: [Tree, ContextMenu, Button, Dialog, InputText, FormsModule, CommonModule],
    providers: [NodeService],
    templateUrl: './resources.html',
    styleUrl: './resources.scss',
    standalone: true
})
export class Resources implements OnInit {
    files = signal<TreeNode[]>([]);
    selectedFile!: TreeNode | null;
    items!: MenuItem[];

    // Dialog states
    showCreateFolderDialog = false;
    showAddFileDialog = false;
    showMoveDialog = false;

    // Form data
    newFolderName = '';
    newFileName = '';
    newFileExtension = '';
    newFileLink = '';
    targetFolder: TreeNode | null = null;
    availableFolders: TreeNode[] = [];

    constructor(
        private nodeService: NodeService,
        private toastService: ToastService
    ) {}

    ngOnInit() {
        this.nodeService.getFiles().then((data) => {
            this.files.set(data);
        });

        this.updateContextMenu();
    }

    updateContextMenu() {
        this.items = [
            {
                label: 'Abrir Link',
                icon: 'pi pi-external-link',
                command: () => this.openFileLink(),
                visible: this.isFile()
            },
            { separator: true },
            {
                label: 'Nova Pasta',
                icon: 'pi pi-folder',
                command: () => this.openCreateFolderDialog()
            },
            {
                label: 'Novo Arquivo',
                icon: 'pi pi-file-plus',
                command: () => this.openAddFileDialog()
            },
            { separator: true },
            {
                label: 'Mover',
                icon: 'pi pi-arrows-alt',
                command: () => this.openMoveDialog(),
                visible: this.selectedFile !== null
            },
            {
                label: 'Deletar',
                icon: 'pi pi-trash',
                command: () => this.deleteNode(),
                visible: this.selectedFile !== null
            }
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

    private isFile(): boolean {
        if (!this.selectedFile) return false;
        const data = this.selectedFile.data as ResourceData;
        return data?.type === 'file';
    }

    openFileLink() {
        if (!this.selectedFile) return;
        const data = this.selectedFile.data as ResourceData;
        if (data.type === 'file' && data.file?.link) {
            window.open(data.file.link, '_blank');
            this.toastService.success('Abrindo arquivo...');
        }
    }

    openCreateFolderDialog() {
        this.newFolderName = '';
        this.showCreateFolderDialog = true;
    }

    openAddFileDialog() {
        this.newFileName = '';
        this.newFileExtension = '';
        this.newFileLink = '';
        this.showAddFileDialog = true;
    }

    openMoveDialog() {
        if (!this.selectedFile) return;
        this.availableFolders = this.getAllFolders();
        this.targetFolder = null;
        this.showMoveDialog = true;
    }

    createFolder() {
        if (!this.newFolderName.trim()) {
            this.toastService.error('Por favor, informe o nome da pasta');
            return;
        }

        const newFolder: TreeNode = {
            key: this.nodeService.generateKey(),
            label: this.newFolderName,
            data: { name: this.newFolderName, type: 'folder' } as ResourceData,
            icon: 'pi pi-fw pi-folder',
            children: []
        };

        if (this.selectedFile) {
            const data = this.selectedFile.data as ResourceData;
            if (data.type === 'folder') {
                if (!this.selectedFile.children) {
                    this.selectedFile.children = [];
                }
                this.selectedFile.children.push(newFolder);
            } else {
                // Se for arquivo, adiciona na raiz
                this.files.update((files) => [...files, newFolder]);
            }
        } else {
            // Adiciona na raiz
            this.files.update((files) => [...files, newFolder]);
        }

        this.showCreateFolderDialog = false;
        this.toastService.success('Pasta criada com sucesso!');
    }

    addFile() {
        if (!this.newFileName.trim() || !this.newFileExtension.trim() || !this.newFileLink.trim()) {
            this.toastService.error('Por favor, preencha todos os campos');
            return;
        }

        const fileData: ResourceFile = {
            name: this.newFileName,
            extension: this.newFileExtension,
            link: this.newFileLink
        };

        const newFile: TreeNode = {
            key: this.nodeService.generateKey(),
            label: `${this.newFileName}.${this.newFileExtension}`,
            data: {
                name: this.newFileName,
                type: 'file',
                file: fileData
            } as ResourceData,
            icon: this.nodeService.getFileIcon(this.newFileExtension)
        };

        if (this.selectedFile) {
            const data = this.selectedFile.data as ResourceData;
            if (data.type === 'folder') {
                if (!this.selectedFile.children) {
                    this.selectedFile.children = [];
                }
                this.selectedFile.children.push(newFile);
            } else {
                // Se for arquivo, adiciona na raiz
                this.files.update((files) => [...files, newFile]);
            }
        } else {
            // Adiciona na raiz
            this.files.update((files) => [...files, newFile]);
        }

        this.showAddFileDialog = false;
        this.toastService.success('Arquivo adicionado com sucesso!');
    }

    moveNode() {
        if (!this.selectedFile || !this.targetFolder) {
            this.toastService.error('Selecione uma pasta de destino');
            return;
        }

        // Remove do local atual
        this.removeNodeFromTree(this.selectedFile);

        // Adiciona no destino
        if (!this.targetFolder.children) {
            this.targetFolder.children = [];
        }
        this.targetFolder.children.push(this.selectedFile);

        this.showMoveDialog = false;
        this.toastService.success('Item movido com sucesso!');
    }

    deleteNode() {
        if (!this.selectedFile) return;

        this.removeNodeFromTree(this.selectedFile);
        this.selectedFile = null;
        this.toastService.success('Item deletado com sucesso!');
    }

    private removeNodeFromTree(node: TreeNode) {
        const removeFromChildren = (nodes: TreeNode[]): boolean => {
            for (let i = 0; i < nodes.length; i++) {
                if (nodes[i].key === node.key) {
                    nodes.splice(i, 1);
                    return true;
                }
                if (nodes[i].children && removeFromChildren(nodes[i].children!)) {
                    return true;
                }
            }
            return false;
        };

        const currentFiles = this.files();
        removeFromChildren(currentFiles);
        this.files.set([...currentFiles]);
    }

    private getAllFolders(nodes?: TreeNode[]): TreeNode[] {
        const folders: TreeNode[] = [];
        const nodesToCheck = nodes || this.files();

        nodesToCheck.forEach((node) => {
            const data = node.data as ResourceData;
            if (data.type === 'folder' && node.key !== this.selectedFile?.key) {
                folders.push(node);
                if (node.children) {
                    folders.push(...this.getAllFolders(node.children));
                }
            }
        });

        return folders;
    }

    getFolderPath(folder: TreeNode): string {
        return folder.label || '';
    }

    onNodeSelect(event: any) {
        this.updateContextMenu();
    }

    onNodeUnselect(event: any) {
        this.updateContextMenu();
    }

    onNodeDoubleClick(event: any) {
        const node = event.node as TreeNode;
        const data = node.data as ResourceData;

        if (data.type === 'file' && data.file?.link) {
            window.open(data.file.link, '_blank');
            this.toastService.success('Abrindo arquivo...');
        }
    }
}
