export default [
  // user
  {
    path: '/user',
    component: '../layouts/UserLayout',
    routes: [
      { path: '/user', redirect: '/user/login' },
      { path: '/user/login', name: 'login', component: './User/Login' },
      { path: '/user/register', name: 'register', component: './User/Register' },
      {
        path: '/user/register-result',
        name: 'register.result',
        component: './User/RegisterResult',
      },
      {
        component: '404',
      },
    ],
  },
  // app
  {
    path: '/',
    component: '../layouts/BasicLayout',
    Routes: ['src/pages/Authorized'],
    routes: [

      // dashboard
      { path: '/', redirect: '/account/center', authority: ['admin', 'user'] },
      {
        // authority: ['user'],
        name: 'account',
        icon: 'user',
        path: '/account',
        routes: [
          // {
          //   path: '/account/center',
          //   name: 'center',
          //   component: './Account/Center/Center',
          //   routes: [
          //     {
          //       path: '/account/center',
          //       redirect: '/account/center/articles',
          //     },
          //     {
          //       path: '/account/center/articles',
          //       component: './Account/Center/Articles',
          //     },
          //     {
          //       path: '/account/center/applications',
          //       component: './Account/Center/Applications',
          //     },
          //     {
          //       path: '/account/center/projects',
          //       component: './Account/Center/Projects',
          //     },
          //   ],
          // },
          {
            path:'/account/center',
            name:'信息查询',
            component:'./Account/Center/InfoQuery',
          },
          {
            authority: ['user'],
            path: '/account/settings',
            name: 'settings',
            component: './Account/Settings/Info',
            routes: [
              {
                path: '/account/settings',
                redirect: '/account/settings/base',
              },
              {
                path: '/account/settings/base',
                component: './Account/Settings/BaseView',
              },
              {
                path: '/account/settings/security',
                component: './Account/Settings/SecurityView',
              },
              {
                path: '/account/settings/binding',
                component: './Account/Settings/BindingView',
              },
              {
                path: '/account/settings/notification',
                component: './Account/Settings/NotificationView',
              },
            ],
          },
        ],
      },
      // {
      //   path:'/stuinfo',
      //   name:'学生信息',
      //   icon:'admin',
      //   routes:[
      //     // {
      //     //   path:'/stuinfo/infoquery',
      //     //   name:'信息查询',
      //     //   component:'./StuInfo/InfoQuery',
      //     // },
      //     {
      //       path: '/stuinfo/settings',
      //       name: '信息修改',
      //       component: './Account/Settings/Info',
      //       routes: [
      //         {
      //           path: '/stuinfo/settings',
      //           redirect: '/stuinfo/settings/base',
      //         },
      //         {
      //           path: '/stuinfo/settings/base',
      //           component: './Account/Settings/BaseView',
      //         },
      //         {
      //           path: '/stuinfo/settings/security',
      //           component: './Account/Settings/SecurityView',
      //         },
      //         {
      //           path: '/stuinfo/settings/binding',
      //           component: './Account/Settings/BindingView',
      //         },
      //         {
      //           path: '/stuinfo/settings/notification',
      //           component: './Account/Settings/NotificationView',
      //         },
      //       ],
      //     }
      //   ]
      // },
      {
        authority: ['user'],
        path:'/stuvacate',
        name:'请假系统',
        icon: 'desktop',
        routes:[
          // {
          //   path:'/stuvacate/vacate',
          //   name:'学生请假',
          //   component:'./StuVacate/Vacate',
          // },
          {
            path:'/stuvacate/dovacate',
            name:'短期请假',
            component:'./StuVacate/DoVacate',
          },
          {
            path:'/stuvacate/vacaterecord',
            name:'请假记录',
            component:'./StuVacate/VacateRecord',
          }
        ]
      },
      // {
      //   path:'/teainfo',
      //   name:'教师信息',
      //   icon:'admin',
      //   routes:[
      //     {
      //       path:'/teainfo/infoquery',
      //       name:'信息查询',
      //       component:'./TeaInfo/InfoQuery',
      //     },
      //     {
      //       path:'/teainfo/infoalter',
      //       name:'信息修改',
      //       component:'./TeaInfo/InfoAlter',
      //     }
      //   ]
      // },
      {
        authority: ['admin'],
        path:'/stumng',
        name:'学生管理',
        icon: 'desktop',
        routes:[
          {
            path:'/stumng/stuinfo',
            name:'信息查询',
            component:'./StuMng/StuInfo',
          },
          {
            path:'/stumng/vacate',
            name:'请假管理',
            component:'./StuMng/Vacate',
          }
        ]
      },
      // {
      //   // authority: ['admin'],
      //   path: '/Newpage',
      //   name: 'Newpage',
      //   icon: 'desktop',
      //   routes: [
      //     {
      //       path: '/Newpage/Welcome',
      //       name: 'Welcome',
      //       component: './Newpage/Welcome',
      //       // 
      //     }
      //   ]
      // },
      // {
      //   path: '/dashboard',
      //   name: 'dashboard',
      //   icon: 'dashboard',
      //   routes: [
      //     {
      //       path: '/dashboard/analysis',
      //       name: 'analysis',
      //       // authority: ['admin'],
      //       component: './Dashboard/Analysis',
      //     },
      //     {
      //       path: '/dashboard/monitor',
      //       name: 'monitor',
      //       authority: ['admin'],
      //       component: './Dashboard/Monitor',
      //     },
      //     {
      //       path: '/dashboard/workplace',
      //       name: 'workplace',
      //       authority: ['user'],
      //       component: './Dashboard/Workplace',
      //     },
      //   ],
      // },
      // // forms
      // {
      //   path: '/form',
      //   icon: 'form',
      //   name: 'form',
      //   routes: [
      //     {
      //       path: '/form/basic-form',
      //       name: 'basicform',
      //       component: './Forms/BasicForm',
      //     },
      //     {
      //       path: '/form/step-form',
      //       name: 'stepform',
      //       component: './Forms/StepForm',
      //       hideChildrenInMenu: true,
      //       routes: [
      //         {
      //           path: '/form/step-form',
      //           redirect: '/form/step-form/info',
      //         },
      //         {
      //           path: '/form/step-form/info',
      //           name: 'info',
      //           component: './Forms/StepForm/Step1',
      //         },
      //         {
      //           path: '/form/step-form/confirm',
      //           name: 'confirm',
      //           component: './Forms/StepForm/Step2',
      //         },
      //         {
      //           path: '/form/step-form/result',
      //           name: 'result',
      //           component: './Forms/StepForm/Step3',
      //         },
      //       ],
      //     },
      //     {
      //       path: '/form/advanced-form',
      //       name: 'advancedform',
      //       authority: ['admin'],
      //       component: './Forms/AdvancedForm',
      //     },
      //   ],
      // },
      // // list
      // {
      //   path: '/list',
      //   icon: 'table',
      //   name: 'list',
      //   routes: [
      //     {
      //       path: '/list/table-list',
      //       name: 'searchtable',
      //       component: './List/TableList',
      //     },
      //     {
      //       path: '/list/basic-list',
      //       name: 'basiclist',
      //       component: './List/BasicList',
      //     },
      //     {
      //       path: '/list/card-list',
      //       name: 'cardlist',
      //       component: './List/CardList',
      //     },
      //     {
      //       path: '/list/search',
      //       name: 'searchlist',
      //       component: './List/List',
      //       routes: [
      //         {
      //           path: '/list/search',
      //           redirect: '/list/search/articles',
      //         },
      //         {
      //           path: '/list/search/articles',
      //           name: 'articles',
      //           component: './List/Articles',
      //         },
      //         {
      //           path: '/list/search/projects',
      //           name: 'projects',
      //           component: './List/Projects',
      //         },
      //         {
      //           path: '/list/search/applications',
      //           name: 'applications',
      //           component: './List/Applications',
      //         },
      //       ],
      //     },
      //   ],
      // },
      // {
      //   path: '/profile',
      //   name: 'profile',
      //   icon: 'profile',
      //   routes: [
      //     // profile
      //     {
      //       path: '/profile/basic',
      //       name: 'basic',
      //       component: './Profile/BasicProfile',
      //     },
      //     {
      //       path: '/profile/basic/:id',
      //       hideInMenu: true,
      //       component: './Profile/BasicProfile',
      //     },
      //     {
      //       path: '/profile/advanced',
      //       name: 'advanced',
      //       authority: ['admin'],
      //       component: './Profile/AdvancedProfile',
      //     },
      //   ],
      // },
      // {
      //   name: 'result',
      //   icon: 'check-circle-o',
      //   path: '/result',
      //   routes: [
      //     // result
      //     {
      //       path: '/result/success',
      //       name: 'success',
      //       component: './Result/Success',
      //     },
      //     { path: '/result/fail', name: 'fail', component: './Result/Error' },
      //   ],
      // },
      // {
      //   name: 'exception',
      //   icon: 'warning',
      //   path: '/exception',
      //   routes: [
      //     // exception
      //     {
      //       path: '/exception/403',
      //       name: 'not-permission',
      //       component: './Exception/403',
      //     },
      //     {
      //       path: '/exception/404',
      //       name: 'not-find',
      //       component: './Exception/404',
      //     },
      //     {
      //       path: '/exception/500',
      //       name: 'server-error',
      //       component: './Exception/500',
      //     },
      //     {
      //       path: '/exception/trigger',
      //       name: 'trigger',
      //       hideInMenu: true,
      //       component: './Exception/TriggerException',
      //     },
      //   ],
      // },
      
      //  editor
      {
        authority: ['user'],
        name: 'editor',
        icon: 'highlight',
        path: '/editor',
        routes: [
          {
            path: '/editor/flow',
            name: 'flow',
            component: './Editor/GGEditor/Flow',
          },
          {
            path: '/editor/mind',
            name: 'mind',
            component: './Editor/GGEditor/Mind',
          },
          {
            path: '/editor/koni',
            name: 'koni',
            component: './Editor/GGEditor/Koni',
          },
        ],
      },
      {
        component: '404',
      },
    ],
  },
];
