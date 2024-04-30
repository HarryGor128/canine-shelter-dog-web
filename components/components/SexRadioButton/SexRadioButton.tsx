import RadioButton from '../common/RadioButton/RadioButton';

interface SexRadioButtonProps {
    onChangeSex: (sex: string) => void;
    defaultValue?: string;
    disabled?: boolean;
}

const SexRadioButton = ({
    onChangeSex,
    defaultValue,
    disabled,
}: SexRadioButtonProps) => {
    return (
        <RadioButton
            label={'Sex'}
            option={[
                { value: 'M', label: 'M' },
                { value: 'F', label: 'F' },
            ]}
            onChangeValue={onChangeSex}
            defaultValue={defaultValue}
            row
            disabled={disabled}
        />
    );
};

export default SexRadioButton;
