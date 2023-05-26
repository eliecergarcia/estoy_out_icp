import React, { useState } from 'react'
import { Layout, Drawer } from 'antd';
import UseWindowDimensions from "../src/ui/utils/size";
import {
    contentStyle,
} from '../src/ui/styles/CommonStyles'
import { CustomHeader } from './ui/components/header/Header';
import { CustomFooter } from './ui/components/footer/CustomFooter';
import { Minter } from './ui/components/minter/Minter';

const { Footer, Content } = Layout;

export const App = () => {
    const { height, } = UseWindowDimensions();
    const [collapsed, setCollapsed] = useState(false);

    return (
        <Layout style={{ padding: 0, margin: 0, width: '100%' }}>
            <Drawer
                placement="left"
                closable
                onClose={() => { setCollapsed(false) }}
                open={collapsed}
                width={300}
                title='Estoy Out'
            >

            </Drawer>
            <CustomHeader
                collapsed={collapsed}
                onClick={() => { setCollapsed(!collapsed) }}
            />
            <Content
                style={{
                    ...contentStyle,
                    height: height * .8
                }}>
                <Minter />
            </Content>
            <CustomFooter />
        </Layout>
    )
}
