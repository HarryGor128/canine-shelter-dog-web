import { Stack } from '@mui/material';

import Button, { ButtonProps } from '../Button/Button';

interface ButtonGroupProps {
    buttonGroup: ButtonProps[];
    margin?: string;
}

const ButtonGroup = ({
    buttonGroup,
    margin = '30px 0 0 0',
}: ButtonGroupProps) => {
    return (
        <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={{ xs: 2, sm: 4 }}
            useFlexGap
            flexWrap={'wrap'}
            justifyContent={'center'}
            margin={margin}
        >
            {buttonGroup.map((button, index) => (
                <Button key={index} {...button} />
            ))}
        </Stack>
    );
};

export default ButtonGroup;
