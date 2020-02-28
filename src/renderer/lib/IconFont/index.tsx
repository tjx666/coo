import { createFromIconfontCN } from '@ant-design/icons';

const IconFontScript: string = require('assets/js/iconfont.js');

const IconFont = createFromIconfontCN({ scriptUrl: IconFontScript });

export default IconFont;
