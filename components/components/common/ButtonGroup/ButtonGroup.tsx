import { Stack } from '@mui/material';
import Button, { ButtonProps } from '../Button/Button';

interface ButtonGroupProps {
    buttonGroup: ButtonProps[];
}

const ButtonGroup = ({ buttonGroup }: ButtonGroupProps) => {
    return (
        <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={{ xs: 2, sm: 4 }}
            useFlexGap
            flexWrap={'wrap'}
            justifyContent={'center'}
            margin={'30px 0px 0px 0px'}
        >
            {buttonGroup.map((button, index) => (
                <Button key={index} {...button} />
            ))}
        </Stack>
    );
};

export default ButtonGroup;
