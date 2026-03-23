import { Layout, Grid } from "antd";
import Navigator from "./navigator";
import Footer from "./footer";

import styles from './style/index.module.less'
import useTriggerSlider from "@/hooks/use-trigger-slider";

interface PageLayoutProps {
  children?: React.ReactNode;
}
const { useBreakpoint } = Grid
export default function PageLayout(props: PageLayoutProps) {
  const { children } = props;
  const { md } = useBreakpoint();
  const { isLargerThanMinWidth } = useTriggerSlider();
  return (
    <Layout className={styles['container']} style={{ minWidth: 360 }}>
      <Navigator />
      <Layout style={{ marginLeft: md ? 150 : 0, transition: 'all .5s ease', minHeight: 'calc(100vh - 64px)', backgroundColor: 'transparent', paddingRight: isLargerThanMinWidth ? '12px' : 0 }}>
        <Layout.Content style={{ padding: '16px', minHeight: '80vh' }} className={styles['content']}>{children}</Layout.Content>
        <Footer className={styles['footer']} />
      </Layout>
    </Layout>
  );
}
