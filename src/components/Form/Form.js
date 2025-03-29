import styles from './Form.module.scss';

const Form = ({ children, ...rest }) => {
  return (
    <form className={styles.form} {...rest}>
      {children}
    </form>
  );
};

export default Form;
