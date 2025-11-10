import { Injectable } from '@angular/core';
import { TreeNode } from 'primeng/api';

export interface ResourceFile {
    name: string;
    extension: string;
    link: string;
}

export interface ResourceData {
    name: string;
    type: 'folder' | 'file';
    file?: ResourceFile;
}

@Injectable()
export class NodeService {
    private keyCounter = 0;

    getTreeNodesData(): TreeNode[] {
        return [
            {
                key: '0',
                label: 'Normas e Diretrizes',
                data: { name: 'Normas e Diretrizes', type: 'folder' } as ResourceData,
                icon: 'pi pi-fw pi-folder',
                children: [
                    {
                        key: '0-0',
                        label: 'Normas ABNT.pdf',
                        icon: 'pi pi-fw pi-file-pdf',
                        data: {
                            name: 'Normas ABNT',
                            type: 'file',
                            file: { name: 'Normas ABNT', extension: 'pdf', link: 'https://drive.google.com/example1' }
                        } as ResourceData
                    },
                    {
                        key: '0-1',
                        label: 'Guia Integridade UFG.pdf',
                        icon: 'pi pi-fw pi-file-pdf',
                        data: {
                            name: 'Guia de Integridade Acadêmica UFG',
                            type: 'file',
                            file: { name: 'Guia Integridade UFG', extension: 'pdf', link: 'https://drive.google.com/example2' }
                        } as ResourceData
                    }
                ]
            },
            {
                key: '1',
                label: 'Templates',
                data: { name: 'Templates', type: 'folder' } as ResourceData,
                icon: 'pi pi-fw pi-folder',
                children: []
            }
        ];
    }

    generateKey(): string {
        return `node-${this.keyCounter++}-${Date.now()}`;
    }

    getFileIcon(extension: string): string {
        const iconMap: { [key: string]: string } = {
            pdf: 'pi pi-fw pi-file-pdf',
            doc: 'pi pi-fw pi-file-word',
            docx: 'pi pi-fw pi-file-word',
            xls: 'pi pi-fw pi-file-excel',
            xlsx: 'pi pi-fw pi-file-excel',
            ppt: 'pi pi-fw pi-file',
            pptx: 'pi pi-fw pi-file',
            txt: 'pi pi-fw pi-file',
            jpg: 'pi pi-fw pi-image',
            jpeg: 'pi pi-fw pi-image',
            png: 'pi pi-fw pi-image',
            gif: 'pi pi-fw pi-image',
            zip: 'pi pi-fw pi-file',
            rar: 'pi pi-fw pi-file'
        };
        return iconMap[extension.toLowerCase()] || 'pi pi-fw pi-file';
    }

    async getFiles(): Promise<TreeNode[]> {
        return Promise.resolve(this.getTreeNodesData());
    }
}
