import { Icon } from 'antd';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const IconFontScript: any = require('assets/js/iconfont.js');

const IconFont = Icon.createFromIconfontCN({ scriptUrl: IconFontScript });

export default IconFont;
