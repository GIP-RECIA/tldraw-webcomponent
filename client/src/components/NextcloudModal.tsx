import { ChangeEvent, useEffect, useState } from "react";
import { faCloud, faDownload } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../assets/scss/nextcloudModal.scss";
import { useTranslation } from "react-i18next";
import { TDDocument } from "@tldraw/tldraw";

type Settings = {
  document: TDDocument;
  onNextcloud: () => void;
  onDownload: () => void;
  onCancel: () => void;
};

function NextcloudModal({
  document,
  onNextcloud,
  onDownload,
  onCancel,
}: Settings) {
  const { t } = useTranslation();

  const [name, setName] = useState<string>(document.name);

  return (
    <div className="modal-background">
      <div className="modal">
        <p className="modal-title">{t("nextcloud.modal.title")}</p>
        <div className="modal-body">
          <input
            type="text"
            className="document-name"
            value={name}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              const { value } = e.target;
              setName(value);
              document.name = value;
            }}
          />
          <div className="choice-container">
            <button type="button" className="choice-item" onClick={onNextcloud}>
              <FontAwesomeIcon icon={faCloud} size="3x" />
              {t("nextcloud.modal.save")}
            </button>
            <button type="button" className="choice-item" onClick={onDownload}>
              <FontAwesomeIcon icon={faDownload} size="3x" />
              {t("nextcloud.modal.download")}
            </button>
          </div>
        </div>
        <div className="modal-footer">
          <button type="button" onClick={onCancel}>
            {t("nextcloud.modal.cancel")}
          </button>
        </div>
      </div>
    </div>
  );
}

export default NextcloudModal;
