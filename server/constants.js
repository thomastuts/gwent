'use strict';

import Glossary from '../common/glossary';
import _ from 'lodash';

const DEBUG = process.env.NODE_ENV === 'debug';

export default _.merge(Glossary, {DEBUG});
