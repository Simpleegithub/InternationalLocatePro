import styles from "./Message.module.css";
import ProTypes from 'prop-types'

function Message({ message }) {
  return (
    <p className={styles.message}>
      <span role="img">👋</span> {message}
    </p>
  );
}

Message.propTypes={
message:ProTypes.string
}

export default Message;
