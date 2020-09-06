import Vue from 'vue';

import SvgIcon from '@/components/SvgIcon';

Vue.use('svg-icon', SvgIcon);

const req = require.context('./svg', false, /\.svg$/);
const requireAll = requireContext => requireContext.keys().map(requireContext);
requireAll(req)
