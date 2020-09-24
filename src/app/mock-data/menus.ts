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
        name: 'Conciliación informacion',
        url: '/recursos-humanos/conciliacion',
        icon: 'icon-cloud-upload'
      }
    ]
  },
  {
    name: 'Contabilidad',
    url: '/contabilidad',
    icon: 'icon-briefcase',
    children: [
      {
        name: 'Altas y bajas',
        url: '/contabilidad/usuarios',
        icon: 'icon-user-unfollow'
      },
      {
        name: 'Aprobación ahorro',
        url: '/contabilidad/validaciones',
        icon: 'icon-check'
      },
      {
        name: 'Historico validaciones',
        url: '/contabilidad/historico',
        icon: 'icon-list'
      },
      {
        name: 'Conciliacion',
        url: '/contabilidad/conciliacion',
        icon: 'icon-calculator',
      },
      {
        name: 'Carga ahorro externos',
        url: '/contabilidad/carga-ahorro',
        icon: 'icon-globe'
      }
    ]
  },
  {
    name: 'Tesoreria',
    url: '/tesoreria',
    icon: 'icon-credit-card',
    children: [
      {
        name: 'Aprobación ahorro',
        url: '/tesoreria/validaciones',
        icon: 'icon-check'
      },
      {
        name: 'Historico validaciones',
        url: '/tesoreria/historico',
        icon: 'icon-list'
      },
    ]
  },
  {
    name: 'Gerencia',
    url: '/gerencia',
    icon: 'icon-user-follow',
    children: [
      {
        name: 'Aprobación ahorro',
        url: '/administracion/validaciones',
        icon: 'icon-check'
      },
      {
        name: 'Historico validaciones',
        url: '/administracion/historico',
        icon: 'icon-list'
      }
    ]
  },
  {
    name: 'Administracion',
    url: '/administracion',
    icon: 'icon-speedometer',
    children: [
      {
        name: 'Administracion roles',
        url: '/administracion/usuarios',
        icon: 'icon-user-unfollow'
      },
      {
        name: 'Aprobación ahorro',
        url: '/administracion/validaciones',
        icon: 'icon-check'
      },
      {
        name: 'Historico validaciones',
        url: '/administracion/historico',
        icon: 'icon-list'
      }
    ]
  }
];
