import { useEffect, useRef } from "react";

function useSerialNumberPrefix(form, setSerialNumber, deps) {
  const prevPrefixRef = useRef(null);

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      const serialNumber = form.getFieldValue("serialNumber");
      if (!serialNumber) return;
      if (!(serialNumber.length >= 11 && serialNumber.length <= 12)) return;


      const category = form.getFieldValue("productCategory") || "";
      const model = form.getFieldValue("productModel") || "";
      const unit = form.getFieldValue("productUnit") || "";

      let prefix = "---"; // default fallback

      if (category === "MARU") {
        if (["7000s", "7100s"].includes(model)) {
          prefix = "570";
        } else if (["5000s", "5000C"].includes(model)) {
          prefix = "550";
        } else if (model === "3000s") {
          prefix = "530";
        } else if (["8000s", "8200s"].includes(model)) {
          prefix = "580";
        } else if (["9000s", "9300s"].includes(model)) {
          prefix = "590";
        }
      } else if (category === "MADEE") {
        if (model === "5000s") {
          if (unit.startsWith("SLAVE#")) {
            const slaveNumber = parseInt(unit.replace("SLAVE#", ""));
            if (!isNaN(slaveNumber)) {
              prefix = `15${slaveNumber}`;
            }
          } else {
            prefix = "150";
          }
        } else if (model === "5100s") {
          prefix = "150";
        }
      } else if (category === "BARON") {
        if (["3000", "3100s"].includes(model)) {
          prefix = "230";
        }
      } else if (category === "ARA") {
        if (model === "5000s") {
          prefix = "350";
        } else if (model === "3000s") {
          prefix = "320";
        }
      } else if (category === "GAS BOX") {
        prefix = "A31";
      } else if (category === "GAS PANEL") {
        prefix = "C32";
      } else if (category === "CONTROLLER") {
        prefix = "B00";
      }

      if (prefix !== prevPrefixRef.current) {
        form.setFieldValue("serialNumber", prefix + serialNumber.slice(3));
        setSerialNumber(prefix + serialNumber.slice(3));
        prevPrefixRef.current = prefix;
      }
    });

    return () => cancelAnimationFrame(frame);
  }, deps);
}

export default useSerialNumberPrefix;
