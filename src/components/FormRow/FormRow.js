import styles from './FormRow.module.scss';

const FormRow = ({ children, ...rest }) => {
  return (
    <div className={styles.formRow} {...rest}>
      {children}
    </div>
  );
};

export default FormRow;
