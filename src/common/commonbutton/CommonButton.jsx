import * as React from "react";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";

export default function CommonButton({ children, onClick, icon: Icon }) {
  return (
    <Stack direction="row" spacing={2}>
      <Button
        variant="outlined"
        startIcon={Icon ? <Icon /> : null}
        onClick={onClick}
      >
        {children}
      </Button>
    </Stack>
  );
}
