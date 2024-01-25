import { memo } from 'react';
import { ButtonGroup, Dropdown, DropdownButton } from 'react-bootstrap';
import './secondary-dropdown.css';
interface SecondaryDropDownProps {
  options: { value: string; label: string }[];
  title: string;
  handleChange: (value: string | null) => void;
  value: string;
}
const SecondaryDropDown = memo(({ options, handleChange, value }: SecondaryDropDownProps) => {
  return (
    <DropdownButton
      as={ButtonGroup}
      id={`dropdown-variants-secondary`}
      variant={'secondary'}
      title={value}
      onSelect={handleChange}
      style={{
        width: '100%',
      }}
    >
      <>
        {options.map(({ label, value }) => (
          <Dropdown.Item key={value} eventKey={value}>
            {label}
          </Dropdown.Item>
        ))}
      </>
    </DropdownButton>
  );
});
export default SecondaryDropDown;
