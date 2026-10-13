import { Modal } from "@/components/partners/modal";
import { PartnerProgram } from "@/components/partners/partner-program";

// Opening /partners from inside the site shows the programme in a modal over the current page.
export default function PartnersModal() {
  return (
    <Modal label="BotLane partner programme">
      <PartnerProgram titleId="partner-title-modal" />
    </Modal>
  );
}
