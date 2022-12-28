import { Navigate, RouteObject } from 'react-router'

import { RouteConfig } from '@/core/Router/type'
import { lazy } from 'react'
import { lazyLoad } from '@/core/Router'
import { BoldOutlined, WifiOutlined, ThunderboltOutlined } from '@ant-design/icons'

const routes: RouteConfig[] = [
	{
		path: '/*',
		element: lazyLoad(lazy(() => import('@/core/Layout'))),
		children: [
			{
				index: true,
				element: <Navigate to={'/parent/child1'} />
			},
			{
				path: 'parent',
				name: '仅在左边显示',
				icon: <BoldOutlined />,
				layout: {
					topItemRender: false
				},
				children: [
					{
						path: 'child1',
						name: '子组件1',
						keepAlive: true,
						element: lazyLoad(lazy(() => import('@/pages/Parent/Child1')))
					},
					{
						path: 'child2',
						name: '子组件2',
						element: lazyLoad(lazy(() => import('@/pages/Parent/Child2')))
					}
				]
			},
			{
				path: 'head',
				name: '仅在头部显示',
				icon: <ThunderboltOutlined />,
				layout: {
					leftItemRender: false
				},
				children: [
					{
						path: 'head1',
						name: '头部1',
						element: <div>头部1</div>
					},
					{
						path: 'head2',
						name: '头部2',
						element: <div>头部2</div>
					}
				]
			},
			{
				path: 'leftAndHead',
				name: '左侧和头部都显示',
				icon: <WifiOutlined />,
				children: [
					{
						path: 'common1',
						name: '共有1',
						element: <div>共有1</div>
					},
					{
						path: 'common2',
						name: '共有2',
						element: <div>共有2</div>
					}
				]
			}
		]
	},
	{
		path: '/403',
		element: <div className="tw-font-bold">无权限</div>
	},
	{ path: '*', element: lazyLoad(lazy(() => import('@/pages/NotFound'))) }
]

export default routes as RouteObject[]
