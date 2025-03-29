import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';

import Layout from '@components/Layout';
import Section from '@components/Section';
import Container from '@components/Container';
import Button from '@components/Button';
import Form from '@components/Form';
import FormRow from '@components/FormRow';

export default function Dashboard() {
  const router = useRouter();

  async function handleOnUpdate(e) {
    e.preventDefault();

    const fields = Array.from(e.currentTarget.elements);
    const product = fields.filter(({ type }) => type !== 'submit').reduce((prev, current) => {
      prev[current.name] = current.value;
      return prev;
    }, {});
    const results = await fetch('http://localhost:3000/api/update', { 
      method: 'POST', 
      body: JSON.stringify({ 
       product_id: router.query.product_id, 
        ...product 
      }) 
    }).then(r => r.json()) 
    if (results?.result?.update_hashes?.includes(router.query.product_id) ) { 
      router.push(`/`); 
    }
  }

  return (
    <Layout>
      <Head>
        <title>Update - SpaceM Store</title>
        <meta name="description" content="Update a product" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Section>
        <Container>
          <h1>Update { router.query.title }</h1>
          <Form onSubmit={handleOnUpdate}>
            <FormRow>
              <label>Title</label>
              <input type="text" name="title" defaultValue={router.query.title} />
            </FormRow>
            <FormRow>
              <label>Sku</label>
              <input type="text" name="sku"  defaultValue={router.query.sku} />
            </FormRow>
            <FormRow>
              <label>Price</label>
              <input type="text" name="price"  defaultValue={router.query.price} />
            </FormRow>
            <FormRow>
              <label>Image</label>
              <input type="text" name="image"  defaultValue={router.query.image} />
            </FormRow>
            <FormRow>
              <Button type="submit">Update Product</Button>
            </FormRow>
          </Form>
        </Container>
      </Section>
    </Layout>
  )
}