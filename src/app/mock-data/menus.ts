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
        name: 'Trámites Ahorro',
        url: '/usuarios/tramites',
        icon: 'icon-doc'
      }
    ]
  },
  {
    name: 'Recursos Humanos',
    url: '/recursos-humanos',
    icon: 'icon-people',
    children: [
      {
        name: 'Altas y bajas',
        url: '/recursos-humanos/usuarios',
        icon: 'icon-user-unfollow'
      },
      {
        name: 'Aprobación ahorro',
        url: '/recursos-humanos/validaciones',
        icon: 'icon-check'
      },
      {
        name: 'Historico validaciones',
        url: '/recursos-humanos/historico',
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
