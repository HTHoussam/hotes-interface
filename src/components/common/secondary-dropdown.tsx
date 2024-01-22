import { memo } from 'react';
import { ButtonGroup, Dropdown, DropdownButton } from 'react-bootstrap';
import './secondary-dropdown.css';
interface SecondaryDropDownProps {
  options: { value: string; label: string }[];
  title: string;
  handleChange: (value: string | null) => void;
}
const SecondaryDropDown = memo(({ options, title, handleChange }: SecondaryDropDownProps) => {
  return (
    <DropdownButton
      as={ButtonGroup}
      id={`dropdown-variants-secondary`}
      variant={'secondary'}
      title={title}
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
