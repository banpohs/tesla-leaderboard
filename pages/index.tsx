import Head from 'next/head'
import { Box, Heading, TableContainer, Table, Thead, Tr, Th, Td, Tbody } from '@chakra-ui/react'
import prisma from '@utils/Prisma'
import { leaderboard } from '@prisma/client'
import { formatSeconds, serialize } from '@utils/Utils'


export default function Home(props: { list: leaderboard[] }) {
  return (
    <>
      <Head>
        <meta http-equiv="refresh" content="10" />
      </Head>
      <Box textAlign='center' py={8} minHeight='100vh' bgColor='blue.100'>
        <Heading size="xl">테슬라 RC카 리더보드</Heading>
        <TableContainer px={20} pt={6}>
          <Table variant='striped' bgColor='white' borderRadius='lg'>
            <Thead>
              <Tr>
                <Th>순위</Th>
                <Th>학번</Th>
                <Th>이름</Th>
                <Th isNumeric>시간</Th>
              </Tr>
            </Thead>
            <Tbody>
            {
          props.list.map((item, index) => <>
          <Tr id={item.idx.toString()}>
            <Td>{index+1}위</Td>
            <Td>{item.studentID}</Td>
            <Td>{item.name}</Td>
            <Td isNumeric>{formatSeconds(item.seconds)}</Td>
          </Tr>
          </>)
        }
            </Tbody>
        
        </Table>
        </TableContainer>
      </Box>
    </>
  )
}

export async function getServerSideProps() {
  const list = await prisma.leaderboard.findMany({
    orderBy: [{ seconds: 'asc'}],
  })

  return { props: { list: serialize(list) }}
}