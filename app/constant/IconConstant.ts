import {
    IconName,
    IconPrefix,
    IconProp,
} from '@fortawesome/fontawesome-svg-core';

const icon = (prefix: IconPrefix, name: IconName): IconProp => {
    return [prefix, name];
};

export default {
    DefaultIconSize: 25,
    DefaultBackButtonSize: 30,
    BackButton: icon('fas', 'arrow-left'),
};
