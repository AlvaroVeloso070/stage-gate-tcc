//TODO apagar depois, apenas para mock
import { Injectable } from '@angular/core';

@Injectable()
export class NodeService {
    getTreeNodesData() {
        return [
            {
                key: '0',
                label: 'Normas e Diretrizes',
                data: 'Normas e Diretrizes',
                icon: 'pi pi-fw pi-folder',
                children: [
                    { key: '0-0', label: 'Normas ABNT.pdf', icon: 'pi pi-fw pi-file-pdf', data: 'Normas ABNT' },
                    { key: '0-1', label: 'Guia Integridade UFG.pdf', icon: 'pi pi-fw pi-file-pdf', data: 'Guia de Integridade Acadêmica UFG' },
                    { key: '0-2', label: 'LGPD - Guia ANPD.pdf', icon: 'pi pi-fw pi-file-pdf', data: 'LGPD - Guia ANPD' },
                    { key: '0-3', label: 'Resoluções CNS.pdf', icon: 'pi pi-fw pi-file-pdf', data: 'Resoluções CNS' }
                ]
            },
            {
                key: '1',
                label: 'EQUATOR Network',
                data: 'EQUATOR Network',
                icon: 'pi pi-fw pi-folder',
                children: [
                    { key: '1-0', label: 'CONSORT.pdf', icon: 'pi pi-fw pi-file-pdf', data: 'CONSORT Guidelines' },
                    { key: '1-1', label: 'STROBE.pdf', icon: 'pi pi-fw pi-file-pdf', data: 'STROBE Guidelines' },
                    { key: '1-2', label: 'PRISMA.pdf', icon: 'pi pi-fw pi-file-pdf', data: 'PRISMA Guidelines' },
                    { key: '1-3', label: 'CARE.pdf', icon: 'pi pi-fw pi-file-pdf', data: 'CARE Guidelines' }
                ]
            },
            {
                key: '2',
                label: 'Métodos de Pesquisa',
                data: 'Métodos de Pesquisa',
                icon: 'pi pi-fw pi-folder',
                children: [
                    { key: '2-0', label: 'Revisões Sistemáticas.pdf', icon: 'pi pi-fw pi-file-pdf', data: 'Revisões Sistemáticas' },
                    { key: '2-1', label: 'Pesquisa Documental.pdf', icon: 'pi pi-fw pi-file-pdf', data: 'Pesquisa Documental' },
                    { key: '2-2', label: 'Pesquisa Observacional.pdf', icon: 'pi pi-fw pi-file-pdf', data: 'Pesquisa Observacional' },
                    { key: '2-3', label: 'Benchmarking.pdf', icon: 'pi pi-fw pi-file-pdf', data: 'Benchmarking' }
                ]
            },
            {
                key: '3',
                label: 'Templates',
                data: 'Templates Folder',
                icon: 'pi pi-fw pi-folder',
                children: [
                    {
                        key: '3-0',
                        label: 'Artigo Científico',
                        data: 'Templates Artigo Científico',
                        icon: 'pi pi-fw pi-folder',
                        children: [
                            { key: '3-0-0', label: 'Template Metodologia.docx', icon: 'pi pi-fw pi-file-word', data: 'Template de Metodologia' },
                            { key: '3-0-1', label: 'Estrutura Completa.docx', icon: 'pi pi-fw pi-file-word', data: 'Estrutura Completa Artigo' }
                        ]
                    },
                    {
                        key: '3-1',
                        label: 'Relatório Técnico',
                        data: 'Templates Relatório Técnico',
                        icon: 'pi pi-fw pi-folder',
                        children: [
                            { key: '3-1-0', label: 'Template Planejamento.docx', icon: 'pi pi-fw pi-file-word', data: 'Template de Planejamento' },
                            { key: '3-1-1', label: 'Estrutura Completa.docx', icon: 'pi pi-fw pi-file-word', data: 'Estrutura Completa Relatório Técnico' }
                        ]
                    }
                ]
            }
        ];
    }


    getTreeTableNodesData() {
        return [
            {
                key: '0',
                data: {
                    name: 'Applications',
                    size: '100kb',
                    type: 'Folder'
                },
                children: [
                    {
                        key: '0-0',
                        data: {
                            name: 'React',
                            size: '25kb',
                            type: 'Folder'
                        },
                        children: [
                            {
                                key: '0-0-0',
                                data: {
                                    name: 'react.app',
                                    size: '10kb',
                                    type: 'Application'
                                }
                            },
                            {
                                key: '0-0-1',
                                data: {
                                    name: 'native.app',
                                    size: '10kb',
                                    type: 'Application'
                                }
                            },
                            {
                                key: '0-0-2',
                                data: {
                                    name: 'mobile.app',
                                    size: '5kb',
                                    type: 'Application'
                                }
                            }
                        ]
                    },
                    {
                        key: '0-1',
                        data: {
                            name: 'editor.app',
                            size: '25kb',
                            type: 'Application'
                        }
                    },
                    {
                        key: '0-2',
                        data: {
                            name: 'settings.app',
                            size: '50kb',
                            type: 'Application'
                        }
                    }
                ]
            },
            {
                key: '1',
                data: {
                    name: 'Cloud',
                    size: '20kb',
                    type: 'Folder'
                },
                children: [
                    {
                        key: '1-0',
                        data: {
                            name: 'backup-1.zip',
                            size: '10kb',
                            type: 'Zip'
                        }
                    },
                    {
                        key: '1-1',
                        data: {
                            name: 'backup-2.zip',
                            size: '10kb',
                            type: 'Zip'
                        }
                    }
                ]
            },
            {
                key: '2',
                data: {
                    name: 'Desktop',
                    size: '150kb',
                    type: 'Folder'
                },
                children: [
                    {
                        key: '2-0',
                        data: {
                            name: 'note-meeting.txt',
                            size: '50kb',
                            type: 'Text'
                        }
                    },
                    {
                        key: '2-1',
                        data: {
                            name: 'note-todo.txt',
                            size: '100kb',
                            type: 'Text'
                        }
                    }
                ]
            },
            {
                key: '3',
                data: {
                    name: 'Documents',
                    size: '75kb',
                    type: 'Folder'
                },
                children: [
                    {
                        key: '3-0',
                        data: {
                            name: 'Work',
                            size: '55kb',
                            type: 'Folder'
                        },
                        children: [
                            {
                                key: '3-0-0',
                                data: {
                                    name: 'Expenses.doc',
                                    size: '30kb',
                                    type: 'Document'
                                }
                            },
                            {
                                key: '3-0-1',
                                data: {
                                    name: 'Resume.doc',
                                    size: '25kb',
                                    type: 'Resume'
                                }
                            }
                        ]
                    },
                    {
                        key: '3-1',
                        data: {
                            name: 'Home',
                            size: '20kb',
                            type: 'Folder'
                        },
                        children: [
                            {
                                key: '3-1-0',
                                data: {
                                    name: 'Invoices',
                                    size: '20kb',
                                    type: 'Text'
                                }
                            }
                        ]
                    }
                ]
            },
            {
                key: '4',
                data: {
                    name: 'Downloads',
                    size: '25kb',
                    type: 'Folder'
                },
                children: [
                    {
                        key: '4-0',
                        data: {
                            name: 'Spanish',
                            size: '10kb',
                            type: 'Folder'
                        },
                        children: [
                            {
                                key: '4-0-0',
                                data: {
                                    name: 'tutorial-a1.txt',
                                    size: '5kb',
                                    type: 'Text'
                                }
                            },
                            {
                                key: '4-0-1',
                                data: {
                                    name: 'tutorial-a2.txt',
                                    size: '5kb',
                                    type: 'Text'
                                }
                            }
                        ]
                    },
                    {
                        key: '4-1',
                        data: {
                            name: 'Travel',
                            size: '15kb',
                            type: 'Text'
                        },
                        children: [
                            {
                                key: '4-1-0',
                                data: {
                                    name: 'Hotel.pdf',
                                    size: '10kb',
                                    type: 'PDF'
                                }
                            },
                            {
                                key: '4-1-1',
                                data: {
                                    name: 'Flight.pdf',
                                    size: '5kb',
                                    type: 'PDF'
                                }
                            }
                        ]
                    }
                ]
            },
            {
                key: '5',
                data: {
                    name: 'Main',
                    size: '50kb',
                    type: 'Folder'
                },
                children: [
                    {
                        key: '5-0',
                        data: {
                            name: 'bin',
                            size: '50kb',
                            type: 'Link'
                        }
                    },
                    {
                        key: '5-1',
                        data: {
                            name: 'etc',
                            size: '100kb',
                            type: 'Link'
                        }
                    },
                    {
                        key: '5-2',
                        data: {
                            name: 'var',
                            size: '100kb',
                            type: 'Link'
                        }
                    }
                ]
            },
            {
                key: '6',
                data: {
                    name: 'Other',
                    size: '5kb',
                    type: 'Folder'
                },
                children: [
                    {
                        key: '6-0',
                        data: {
                            name: 'todo.txt',
                            size: '3kb',
                            type: 'Text'
                        }
                    },
                    {
                        key: '6-1',
                        data: {
                            name: 'logo.png',
                            size: '2kb',
                            type: 'Picture'
                        }
                    }
                ]
            },
            {
                key: '7',
                data: {
                    name: 'Pictures',
                    size: '150kb',
                    type: 'Folder'
                },
                children: [
                    {
                        key: '7-0',
                        data: {
                            name: 'barcelona.jpg',
                            size: '90kb',
                            type: 'Picture'
                        }
                    },
                    {
                        key: '7-1',
                        data: {
                            name: 'primeng.png',
                            size: '30kb',
                            type: 'Picture'
                        }
                    },
                    {
                        key: '7-2',
                        data: {
                            name: 'prime.jpg',
                            size: '30kb',
                            type: 'Picture'
                        }
                    }
                ]
            },
            {
                key: '8',
                data: {
                    name: 'Videos',
                    size: '1500kb',
                    type: 'Folder'
                },
                children: [
                    {
                        key: '8-0',
                        data: {
                            name: 'primefaces.mkv',
                            size: '1000kb',
                            type: 'Video'
                        }
                    },
                    {
                        key: '8-1',
                        data: {
                            name: 'intro.avi',
                            size: '500kb',
                            type: 'Video'
                        }
                    }
                ]
            }
        ];
    }

    getFiles() {
        return Promise.resolve(this.getTreeNodesData());
    }

}
