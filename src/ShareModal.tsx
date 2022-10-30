import ClipboardDocument from "@heroicons/react/24/outline/ClipboardDocumentIcon";
import cx from "classnames";
import { MutableRefObject, useCallback, useEffect, useState } from "react";
import ReactModal from "react-modal";

import { PomuBackground } from "./pomus/catalog";
import * as PomuSerdes from "./PomuSerdes";
import { PomuItem } from "./usePomuItems";

import styles from "./ShareModal.module.scss";

export default function ShareModal(props: {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  background: PomuBackground;
  itemsRef: MutableRefObject<PomuItem[]>;
}): JSX.Element {
  const { isOpen, setIsOpen, background, itemsRef } = props;

  const [copyClicked, setCopyClicked] = useState<boolean>(false);
  const [shareUrl, setShareUrl] = useState<string>("");

  const close = useCallback((): void => setIsOpen(false), [setIsOpen]);

  const copyLink = useCallback(() => {
    navigator.clipboard.writeText(shareUrl);
    setCopyClicked(true);
    setTimeout(() => setCopyClicked(false), 1000);
  }, [shareUrl]);

  useEffect(() => {
    if (isOpen) {
      const serialized = PomuSerdes.serialize(background, itemsRef.current);
      setShareUrl(
        `${window.location.origin}${window.location.pathname}#/view/${serialized}`
      );
    }
  }, [isOpen, background, itemsRef]);

  return (
    <ReactModal isOpen={isOpen} onRequestClose={close} className={styles.share}>
      <div>
        <h1>Share</h1>
        <button onClick={close}>Close</button>
        <div className={styles.link}>
          <a href={shareUrl} target="_blank" rel="noreferrer">
            {shareUrl}
          </a>
          <ClipboardDocument onClick={copyLink} />
        </div>
        <div className={cx(styles.copied, copyClicked ? styles.clicked : null)}>
          Copied!
        </div>
      </div>
    </ReactModal>
  );
}
