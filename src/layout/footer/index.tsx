import { Divider, Flex, Layout, Typography } from "antd";

interface Iprops {
  style?: React.CSSProperties;
  className?: string;
}

export default function Footer(props: Iprops) {
  const { style, className } = props;

  return (
    <Layout.Footer style={{ ...style }} className={className}>
      <Divider style={{ fontSize: '15px', color: '#8a9099', fontWeight: 350 }}>欢迎使用，如果这个项目对您有帮助，请给我们一个 ⭐️</Divider>
      <Flex justify="center">
        Isotope Lab | 同位素实验室
      </Flex>
      <Flex justify="center">
        南京大学地球科学与工程学院 魏海珍 课题组
      </Flex>
      <Flex justify="center" align="center">
        <div>
          Copyright © <Typography.Link href="https://github.com/Junlin-Robin" target="_blank">王俊霖</Typography.Link> and <Typography.Link href="mailto:haizhenwei@nju.edu.cn">魏海珍</Typography.Link> 2024-present
        </div>
      </Flex>
    </Layout.Footer>
  );
}
