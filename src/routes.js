import React from 'react';

const Home = React.lazy(() => import('./views/Home/Home'));
const MyTask = React.lazy(() => import('./views/MyTask/MyTask'));
const TaskUpdate = React.lazy(() => import('./views/TaskUpdate/TaskUpdate'))
const Leaves = React.lazy(() => import('./views/Leaves/Leaves'))
const Ftp = React.lazy(() => import('./views/Ftp/Ftp'))
const LeavesForm = React.lazy(() => import('./views/LeavesForm/LeavesForm'))
const Calender = React.lazy(() => import('./views/Calender/Calender'))
const Message = React.lazy(() => import('./containers/DefaultLayout/Message'))
const MessageList = React.lazy(() => import('./containers/DefaultLayout/MessageList'))
const Chat = React.lazy(() => import('./views/Messages/Chat') )


const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/Home', name: 'Home', component: Home },
  { path: '/TaskUpdate', name: 'TaskUpdate', component: TaskUpdate },
  { path: '/MyTask', exact: true,  name: 'MyTask', component: MyTask },
  { path: '/Leaves', exact: true,  name: 'Leaves', component: Leaves },
  { path: '/Ftp', exact: true,  name: 'Ftp', component: Ftp },
  { path: '/LeavesForm', exact: true,  name: 'LeavesForm', component: LeavesForm },
  { path: '/Calender', exact: true,  name: 'Calender', component: Calender },
  { path: '/Message', exact: true,  name: 'Message', component: Message },
  { path: '/MessageList', exact: true,  name: 'MessageList', component: MessageList },
  { path: '/Chat', exact: true,  name: 'Chat', component: Chat },

];

export default routes;
