import { Box, Stepper, Step, StepLabel } from "@mui/material"

const steps = [
    'capturing image',
    'predicting',
    'complete'
]

export function Status({ active }) {
    console.log('active: ',active);
    return (
        <Box sx={{ width: '100%'}}>
            <Stepper activeStep={active}>
                {steps.map((label) => (
                    <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                    </Step>
                ))}
            </Stepper>
        </Box>
    )
}