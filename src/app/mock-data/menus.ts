import { INavData } from '@coreui/angular';

export const menu: INavData[] = [
  {
    name: 'Dashboard',
    url: '/dashboard',
    icon: 'icon-notebook',
  },
  {
    title: true,
    name: 'MODULOS'
  },
  {
    name: 'Usuario ISBG',
    url: '/usuarios',
    icon: 'icon-user',
    children: [
      {
        name: 'Historico ahorro',
        url: '/usuarios/reportes',
        icon: 'icon-chart'
      },
      {
        name: 'Solicitud Ahorro',
        url: '/base/cards',
        icon: 'icon-doc'
      },
      {
        name: 'Cancelacion ahorro',
        url: '/base/carousels',
        icon: 'icon-envelope-open'
      },
      {
        name: 'Modificacion ahorro',
        url: '/base/collapses',
        icon: 'icon-refresh'
      },
      {
        name: 'Retiro Anticipado',
        url: '/base/forms',
        icon: 'icon-reload'
      }
    ]
  },
  {
    name: 'Recursos Humanos',
    url: '/buttons',
    icon: 'icon-people',
    children: [
      {
        name: 'Altas y bajas',
        url: '/buttons/buttons',
        icon: 'icon-user-unfollow'
      },
      {
        name: 'Aprobación ahorro',
        url: '/buttons/dropdowns',
        icon: 'icon-check'
      },
      {
        name: 'Reportes',
        url: '/buttons/brand-buttons',
        icon: 'icon-list'
      },
      {
        name: 'Carga informacion',
        url: '/buttons/brand-buttons',
        icon: 'icon-cloud-upload'
      }
    ]
  },
  {
    name: 'Contabilidad',
    url: '/icons',
    icon: 'icon-briefcase',
    children: [
      {
        name: 'Aprobación ahorro',
        url: '/icons/coreui-icons',
        icon: 'icon-check',
      },
      {
        name: 'Reportes',
        url: '/icons/flags',
        icon: 'icon-list'
      },
      {
        name: 'Conciliacion',
        url: '/icons/font-awesome',
        icon: 'icon-calculator',
      },
      {
        name: 'Carga externa',
        url: '/icons/simple-line-icons',
        icon: 'icon-globe'
      }
    ]
  },
  {
    name: 'Tesoreria',
    url: '/notifications',
    icon: 'icon-credit-card',
    children: [
      {
        name: 'Aprobación ahorro',
        url: '/notifications/alerts',
        icon: 'icon-check',
      },
      {
        name: 'Reportes',
        url: '/notifications/badges',
        icon: 'icon-list'
      },
      {
        name: 'Retiros anticipados',
        url: '/notifications/modals',
        icon: 'icon-bell'
      },
      {
        name: 'Cancelacion de ahorro',
        url: '/notifications/modals',
        icon: 'icon-bell'
      }
    ]
  },
  {
    name: 'Administracion',
    url: '/pages',
    icon: 'icon-speedometer',
    children: [
      {
        name: 'Altas y bajas',
        url: '/buttons/buttons',
        icon: 'icon-user-unfollow'
      },
      {
        name: 'Reportes',
        url: '/icons/flags',
        icon: 'icon-list'
      },
      {
        name: 'Indicadores',
        url: '/charts',
        icon: 'icon-pie-chart'
      },
    ]
  }
];
