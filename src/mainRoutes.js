import {lazy} from 'react';

const Dashboard = lazy(() => import('./pages/dashboard/Dashboard'))

const OngoingOrder = lazy(() => import('./pages/orders/ongoingOrders'))
const PendingApprovalOrder = lazy(() => import('./pages/orders/pendingApprovalOrders'))
const PaymentCompletedOrder = lazy(() => import('./pages/orders/paymentCompleteOrders'))
const RegularOrder = lazy(() => import('./pages/orders/regularOrder'))
const scheduledOrder = lazy(() => import('./pages/orders/scheduleOrder'))
const OngoingPartyOrder = lazy(() => import('./pages/orders/ongoingPartyOrder'))
const CompletedPartyOrder = lazy(() => import('./pages/orders/completedPartyOrder'))
const RejectedPartyOrder = lazy(() => import('./pages/orders/rejectedPartyOrder'))
const ViewOrder = lazy(() => import('./pages/orders/viewOrder'))

const AllProduct = lazy(() => import('./pages/product/productList'))
const ViewProduct = lazy(() => import('./pages/product/viewProduct'))

const AllEmployee = lazy(() => import('./pages/employee/allEmployee'))
const ViewEmployee = lazy(() => import('./pages/employee/viewEmployee'))

const ViewPayment = lazy(() => import('./pages/payment/paymentShow'))

const ViewUser = lazy(() => import('./pages/user/userData'))

const ViewCoupon = lazy(() => import('./pages/coupon/allCoupon'))

const ViewCharges = lazy(() => import('./pages/charges/charges'))



const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/homepage', name: 'HomePage', component: Dashboard },
  { path: '/view', name: 'Show Detail', component: Dashboard, exact: true },

  { path: '/pending', name: 'Pending', component: PendingApprovalOrder, exact: true },
  { path: '/pending/ongoing', name: 'Ongoing Order', component: OngoingOrder, exact: true },
  { path: '/pending/approval', name: 'Need Approval', component: PendingApprovalOrder, exact: true },
  { path: '/pending/completed', name: 'Completed Payment', component: PaymentCompletedOrder, exact: true },
  { path: '/regular', name: 'Regular Order', component: RegularOrder, exact: true },
  { path: '/schedule', name: 'Schedule Order', component: scheduledOrder, exact: true },
  { path: '/orders', name: 'Party Order', component: OngoingPartyOrder, exact: true },
  { path: '/orders/ongoing', name: 'Ongoing Order', component: OngoingPartyOrder, exact: true },
  { path: '/orders/completed', name: 'Completed Order', component: CompletedPartyOrder, exact: true },
  { path: '/orders/rejected', name: 'Rejected Order', component: RejectedPartyOrder, exact: true },
  { path: '/view/order', name: 'Order Details', component: ViewOrder, exact: true },
  
  { path: '/operation', name: 'Operation', component: AllProduct, exact: true },
  { path: '/operation/product', name: 'All Products', component: AllProduct, exact: true },
  { path: '/view/product', name: 'View Product', component: ViewProduct, exact: true },

  { path: '/operation/employee', name: 'All Employees', component: AllEmployee, exact: true },
  { path: '/view/Employee', name: 'View Employee', component: ViewEmployee, exact: true },

  { path: '/operation/payment', name: 'All Payments', component: ViewPayment, exact: true },

  { path: '/operation/user', name: 'All Users', component: ViewUser, exact: true },

  { path: '/operation/discount', name: 'All Coupon', component: ViewCoupon, exact: true },

  { path: '/operation/charges', name: 'Delivery charges', component: ViewCharges, exact: true },
]

export default routes;
