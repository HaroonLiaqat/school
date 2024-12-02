import React from "react";

import {
  Button,
  Dialog,
  DialogTitle,
  DialogHeader,
  DialogContent,
  DialogTrigger,
} from "../base/index";
import DetailForm from "./DetailForm";
import Text from "./Text";
import { Instructor } from 'src/screens/home';

const DetailFormModal: React.FC<{instructor:Instructor|null}> = ({instructor}) => {
  const [isOpen, setIsOpen] = React.useState(false);

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="w-40 py-6">
          <Text
            fontSize="text-xl"
            fontWeight="font-medium"
            className="text-light px-5"
          >
            Book Now
          </Text>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <div
          style={{ scrollbarWidth: "none" }}
          className="h-[80dvh] overflow-y-auto border-dark border-2 rounded-md mt-4 py-2"
        >
          <DialogHeader>
            <DialogTitle className="text-center text-2xl font-medium mb-3">
              Please tell us your details
            </DialogTitle>
          </DialogHeader>
          <DetailForm onSubmitSuccess={handleClose} instructor={instructor} />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DetailFormModal;
