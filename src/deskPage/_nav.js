export default [
  {
    _tag: 'CSidebarNavItem',
    name: 'HomePage',
    to: '/homepage',
    icon: 'cil-speedometer',
    badge: {
      color: 'info',
      text: 'Welcome',
    }
  },
  {
    _tag: 'CSidebarNavTitle',
    _children: ['Orders']
  },
  {
    _tag: 'CSidebarNavDropdown',
    name: 'Pending Orders',
    route: '/pending',
    icon: 'cil-star',
    _children: [
      {
        _tag: 'CSidebarNavItem',
        name: 'Ongoing Order',
        to: '/pending/ongoing',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Need Approval',
        to: '/pending/approval',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Completed Payment',
        to: '/pending/completed',
      }
    ],
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Regular Order',
    to: '/regular',
    icon: 'cil-puzzle',
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Schedule Order',
    to: '/schedule',
    icon: 'cil-calendar',
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Party order',
    to: '/orders/party',
    icon: 'cil-cursor',
  },
  {
    _tag: 'CSidebarNavTitle',
    _children: ['Operation']
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Product',
    to: '/operation/product',
    icon: 'cil-puzzle',
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Delivery Person',
    to: '/operation/employee',
    icon: 'cil-calendar',
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Payment',
    to: '/operation/payment',
    icon: 'cil-puzzle',
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'User',
    to: '/operation/user',
    icon: 'cil-calendar',
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Discount Coupon',
    to: '/operation/discount',
    icon: 'cil-puzzle',
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Delivery Chargers',
    to: '/operation/charges',
    icon: 'cil-calendar',
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'App Offers',
    to: '/operation/offers',
    icon: 'cil-cursor',
  },
  {
    _tag: 'CSidebarNavDropdown',
    name: 'Restaurant',
    route: '/operation/Restraint',
    icon: 'cil-cursor',
    _children: [
      {
        _tag: 'CSidebarNavItem',
        name: 'Update Details',
        to: '/operation/Restraint/update',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Working duration',
        to: '/operation/Restraint/details',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Busy Slots',
        to: '/operation/Restraint/busy',
      }
    ],
  },
  {
    _tag: 'CSidebarNavTitle',
    _children: ['Reporting']
  },
  {
    _tag: 'CSidebarNavDropdown',
    name: 'Reporting',
    route: '/reporting',
    icon: 'cil-cursor',
    _children: [
      {
        _tag: 'CSidebarNavItem',
        name: 'Location wise',
        to: '/reporting/location',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Week wise',
        to: '/reporting/week',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Monthly wise',
        to: '/reporting/monthly',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Customize Report',
        to: '/reporting/custom',
      }
    ],
  },
  {
    _tag: 'CSidebarNavDropdown',
    name: 'Review',
    route: '/review',
    icon: 'cil-cursor',
    _children: [
      {
        _tag: 'CSidebarNavItem',
        name: 'Order wise',
        to: '/review/order',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Product wise',
        to: '/review/product',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Delivery Person wise',
        to: '/review/employee',
      }
    ],
  },
  {
    _tag: 'CSidebarNavDivider',
    className: 'm-2'
  }
]

