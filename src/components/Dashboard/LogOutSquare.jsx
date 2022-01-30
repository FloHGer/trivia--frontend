
import { motion, AnimatePresence } from "framer-motion";

import { FaSignInAlt } from "react-icons/fa";
import classes from "./../../sass/components/UserProfile/LogOutSquare.module.scss";

export default function LogOutSquare() {
    return (
        <div>
            <AnimatePresence>
                <motion.div
                    initial={{ rotate: "0deg" }}
                    animate={{ rotate: "360deg" }}
                    transition={{ duration: 1 }}
                >
                    <div className={classes.login__square}>
                        <FaSignInAlt className={classes.login__icon} />
                    </div>
                </motion.div>
            </AnimatePresence>
        </div>
    );
}
