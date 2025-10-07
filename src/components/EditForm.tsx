import * as formik from 'formik';
import * as yup from 'yup'; //Once form is complete, remove wildcard to bring in necessary imports only

import React, { useState } from "react";
import { Formik, FieldArray } from "formik";
import * as Yup from "yup";
import {
  Form,
  Row,
  Col,
  Button,
  InputGroup,
  Alert,
  Table,
  Spinner,
} from "react-bootstrap";

type LineItem = {
  company: string;
  funding: string;
  account: string;
  dept: string;
  program: string;
  project: string;
  amount: string; // keep as string for easier masking; validate as number
};

type FormValues = {
  invoiceId: string;
  vendor: string;
  amount: string;
  dateDue: string;
  specialInstructions?: string; // optional
  poNumber?: string;            // optional (dropdown)
  lineItems: LineItem[];
  acknowledge: boolean;
};

const initialValues: FormValues = {
  invoiceId: "",
  vendor: "",
  amount: "",
  dateDue: "",
  specialInstructions: "",
  poNumber: "",
  lineItems: [
    {
      company: "",
      funding: "",
      account: "",
      dept: "",
      program: "",
      project: "",
      amount: "",
    },
  ],
  acknowledge: false,
};

const lineItemSchema = Yup.object({
  company: Yup.string().trim().required("Required"),
  funding: Yup.string().trim().required("Required"),
  account: Yup.string().trim().required("Required"),
  dept: Yup.string().trim().required("Required"),
  program: Yup.string().trim().required("Required"),
  project: Yup.string().trim().required("Required"),
  amount: Yup.string()
    .trim()
    .required("Required")
    .test("is-money", "Enter a valid amount", (v) => {
      if (!v) return false;
      const n = Number(v.replace(/[$,]/g, ""));
      return !isNaN(n) && isFinite(n) && n >= 0;
    }),
});

const schema = Yup.object({
  invoiceId: Yup.string().trim().required("Invoice ID is required"),
  vendor: Yup.string().trim().required("Vendor is required"),
  amount: Yup.string()
    .trim()
    .required("Amount is required")
    .test("is-money", "Enter a valid amount", (v) => {
      if (!v) return false;
      const n = Number(v.replace(/[$,]/g, ""));
      return !isNaN(n) && isFinite(n) && n >= 0;
    }),
  dateDue: Yup.date().typeError("Enter a valid date").required("Due date is required"),
  specialInstructions: Yup.string().trim().max(2000, "Max 2000 chars").optional(),
  poNumber: Yup.string().trim().optional(),
  lineItems: Yup.array().of(lineItemSchema).min(1, "At least one line is required"),
  acknowledge: Yup.boolean().oneOf([true], "Please acknowledge your edits"),
});

function sanitize(values: FormValues): FormValues {
  const clean = {
    ...values,
    invoiceId: values.invoiceId.trim(),
    vendor: values.vendor.trim(),
    amount: values.amount.trim(),
    dateDue: values.dateDue,
    specialInstructions: values.specialInstructions?.trim() || "",
    poNumber: values.poNumber?.trim() || "",
    lineItems: values.lineItems.map((li) => ({
      ...li,
      company: li.company.trim(),
      funding: li.funding.trim(),
      account: li.account.trim(),
      dept: li.dept.trim(),
      program: li.program.trim(),
      project: li.project.trim(),
      amount: li.amount.trim(),
    })),
  };
  return clean;
}

const poOptions = [
  { value: "", label: "— None —" },
  { value: "TCS", label: "TCS" },
  { value: "FDIMMP", label: "FDIMMP" },
  { value: "FOFM", label: "FOFM" },
  { value: "HS", label: "HS" },
  { value: "LCF", label: "LCF" },
  { value: "NGR", label: "NGR" },
  { value: "PB", label: "PB" },
  { value: "SRV", label: "SRV" },
];

const EditForm: React.FC<{ onSubmitted?: () => void }> = ({ onSubmitted }) => {
  const [success, setSuccess] = useState(false);

  const mockSubmit = async (_clean: FormValues) => {
    // simulate API; keep fast for demo
    await new Promise((r) => setTimeout(r, 700));
  };

  return (
    <div className="p-3">
      <h5 className="mb-3">Request Edits to Check Request</h5>

      {success && (
        <Alert
          variant="success"
          dismissible
          onClose={() => setSuccess(false)}
          className="mb-3"
        >
          Your edit request was submitted successfully. A confirmation has been recorded.
        </Alert>
      )}

      <Formik
        validationSchema={schema}
        initialValues={initialValues}
        onSubmit={async (values, { setSubmitting, resetForm }) => {
          setSubmitting(true);
          try {
            const clean = sanitize(values);
            await mockSubmit(clean);
            setSuccess(true);
            resetForm();
            onSubmitted?.();
          } finally {
            setSubmitting(false);
          }
        }}
      >
        {({
          handleSubmit,
          handleChange,
          handleBlur,
          values,
          errors,
          touched,
          isSubmitting,
          setFieldValue,
        }) => (
          <Form noValidate onSubmit={handleSubmit}>
            <Row className="g-3">
              <Col md={6}>
                <Form.Group controlId="invoiceId">
                  <Form.Label>Invoice ID</Form.Label>
                  <Form.Control
                    name="invoiceId"
                    value={values.invoiceId}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isInvalid={touched.invoiceId && !!errors.invoiceId}
                    placeholder="INV-2025-000123"
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.invoiceId}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group controlId="vendor">
                  <Form.Label>Vendor</Form.Label>
                  <Form.Control
                    name="vendor"
                    value={values.vendor}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isInvalid={touched.vendor && !!errors.vendor}
                    placeholder="COMCAST BUSINESS"
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.vendor}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group controlId="amount">
                  <Form.Label>Amount</Form.Label>
                  <InputGroup hasValidation>
                    <InputGroup.Text>$</InputGroup.Text>
                    <Form.Control
                      name="amount"
                      value={values.amount}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isInvalid={touched.amount && !!errors.amount}
                      placeholder="1,030.00"
                      inputMode="decimal"
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.amount as string}
                    </Form.Control.Feedback>
                  </InputGroup>
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group controlId="dateDue">
                  <Form.Label>Date Due</Form.Label>
                  <Form.Control
                    type="date"
                    name="dateDue"
                    value={values.dateDue}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isInvalid={touched.dateDue && !!errors.dateDue}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.dateDue as string}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group controlId="poNumber">
                  <Form.Label>PO # (optional)</Form.Label>
                  <Form.Select
                    name="poNumber"
                    value={values.poNumber}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  >
                    {poOptions.map((o) => (
                      <option key={o.value} value={o.value}>
                        {o.label}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group controlId="specialInstructions">
                  <Form.Label>Special Instructions (optional)</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={2}
                    name="specialInstructions"
                    value={values.specialInstructions}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isInvalid={
                      touched.specialInstructions && !!errors.specialInstructions
                    }
                    placeholder="Any extra context for approvers…"
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.specialInstructions as string}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>

              <Col xs={12}>
                <Form.Label className="fw-semibold">Allocation Lines</Form.Label>
                <FieldArray name="lineItems">
                  {({ push, remove }) => (
                    <>
                      <Table bordered responsive size="sm" className="align-middle">
                        <thead>
                          <tr>
                            <th style={{minWidth: 120}}>Company</th>
                            <th style={{minWidth: 120}}>Funding</th>
                            <th style={{minWidth: 120}}>Account</th>
                            <th style={{minWidth: 120}}>Dept</th>
                            <th style={{minWidth: 120}}>Program</th>
                            <th style={{minWidth: 120}}>Project</th>
                            <th style={{minWidth: 120}}>Amount</th>
                            <th style={{width: 60}}></th>
                          </tr>
                        </thead>
                        <tbody>
                          {values.lineItems.map((li, idx) => {
                            const path = (f: keyof LineItem) => `lineItems.${idx}.${f}`;
                            const t = (f: keyof LineItem) =>
                              touched.lineItems?.[idx]?.[f];
                            const e = (f: keyof LineItem) =>
                              (errors.lineItems?.[idx] as any)?.[f] as string | undefined;

                            return (
                              <tr key={idx}>
                                <td>
                                  <Form.Control
                                    name={path("company")}
                                    value={li.company}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    isInvalid={!!t("company") && !!e("company")}
                                  />
                                  <Form.Control.Feedback type="invalid">
                                    {e("company")}
                                  </Form.Control.Feedback>
                                </td>
                                <td>
                                  <Form.Control
                                    name={path("funding")}
                                    value={li.funding}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    isInvalid={!!t("funding") && !!e("funding")}
                                  />
                                  <Form.Control.Feedback type="invalid">
                                    {e("funding")}
                                  </Form.Control.Feedback>
                                </td>
                                <td>
                                  <Form.Control
                                    name={path("account")}
                                    value={li.account}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    isInvalid={!!t("account") && !!e("account")}
                                  />
                                  <Form.Control.Feedback type="invalid">
                                    {e("account")}
                                  </Form.Control.Feedback>
                                </td>
                                <td>
                                  <Form.Control
                                    name={path("dept")}
                                    value={li.dept}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    isInvalid={!!t("dept") && !!e("dept")}
                                  />
                                  <Form.Control.Feedback type="invalid">
                                    {e("dept")}
                                  </Form.Control.Feedback>
                                </td>
                                <td>
                                  <Form.Control
                                    name={path("program")}
                                    value={li.program}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    isInvalid={!!t("program") && !!e("program")}
                                  />
                                  <Form.Control.Feedback type="invalid">
                                    {e("program")}
                                  </Form.Control.Feedback>
                                </td>
                                <td>
                                  <Form.Control
                                    name={path("project")}
                                    value={li.project}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    isInvalid={!!t("project") && !!e("project")}
                                  />
                                  <Form.Control.Feedback type="invalid">
                                    {e("project")}
                                  </Form.Control.Feedback>
                                </td>
                                <td>
                                  <InputGroup hasValidation>
                                    <InputGroup.Text>$</InputGroup.Text>
                                    <Form.Control
                                      name={path("amount")}
                                      value={li.amount}
                                      onChange={handleChange}
                                      onBlur={handleBlur}
                                      inputMode="decimal"
                                      isInvalid={!!t("amount") && !!e("amount")}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                      {e("amount")}
                                    </Form.Control.Feedback>
                                  </InputGroup>
                                </td>
                                <td className="text-center">
                                  <Button
                                    variant="outline-danger"
                                    size="sm"
                                    onClick={() => remove(idx)}
                                    disabled={values.lineItems.length === 1}
                                    aria-label={`Remove line ${idx + 1}`}
                                  >
                                    ✕
                                  </Button>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </Table>

                      <div className="d-flex justify-content-end mb-2">
                        <Button
                          variant="outline-primary"
                          size="sm"
                          onClick={() =>
                            push({
                              company: "",
                              funding: "",
                              account: "",
                              dept: "",
                              program: "",
                              project: "",
                              amount: "",
                            })
                          }
                        >
                          + Add Line
                        </Button>
                      </div>
                    </>
                  )}
                </FieldArray>
                {typeof errors.lineItems === "string" && (
                  <div className="text-danger small">{errors.lineItems}</div>
                )}
              </Col>

              <Col xs={12}>
                <Form.Check
                  id="acknowledge"
                  name="acknowledge"
                  checked={values.acknowledge}
                  onChange={(e) => setFieldValue("acknowledge", e.currentTarget.checked)}
                  onBlur={handleBlur}
                  isInvalid={touched.acknowledge && !!errors.acknowledge}
                  label="I acknowledge that the above edits are accurate and authorized."
                />
                {touched.acknowledge && errors.acknowledge && (
                  <div className="text-danger small mt-1">
                    {errors.acknowledge as string}
                  </div>
                )}
              </Col>

              <Col xs={12} className="d-flex gap-2 justify-content-end">
                <Button type="reset" variant="outline-secondary" disabled={isSubmitting}>
                  Clear
                </Button>
                <Button type="submit" variant="primary" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <Spinner as="span" animation="border" size="sm" className="me-2" />
                      Submitting…
                    </>
                  ) : (
                    "Submit Edits"
                  )}
                </Button>
              </Col>
            </Row>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default EditForm;
