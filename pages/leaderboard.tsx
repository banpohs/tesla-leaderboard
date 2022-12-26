import Head from 'next/head'
import {
  Box,
  Heading,
  TableContainer,
  Table,
  Thead,
  Tr,
  Th,
  Td,
  Tbody,
  Text
} from '@chakra-ui/react'
import prisma from '@utils/Prisma'
import { leaderboard } from '@prisma/client'
import { formatSeconds, serialize } from '@utils/Utils'

export default function Home(props: { list: leaderboard[] }) {
  let rank = 0
  return (
    <>
      <Head>
        <meta http-equiv="refresh" content="10" />
      </Head>
      <Box
        textAlign="center"
        px={20}
        py={8}
        minHeight="100vh"
        bgColor="blue.100"
      >
        <Heading size="xl" pb={10}>
          테슬라 & PEW RC카 리더보드
        </Heading>
        <Box bgColor="white" mx="auto" w={60} py={4} borderRadius="lg">
          <Heading size="md" textTransform="uppercase">
            최고 기록
          </Heading>
          <Text pt="2" fontSize="lg">
            {props.list[0].studentID} {props.list[0].name}
          </Text>
          <Heading fontSize="3xl" textColor="red">
            {formatSeconds(props.list[0].seconds)}
          </Heading>
        </Box>
        <TableContainer pt={6}>
          <Table variant="striped" bgColor="white" borderRadius="lg" fontSize='xl'>
            <Thead>
              <Tr>
                <Th w={2}>순위</Th>
                <Th>학번</Th>
                <Th>이름</Th>
                <Th isNumeric>시간</Th>
              </Tr>
            </Thead>
            <Tbody>
              {props.list.map((item, index) => {
                if (!item.staff) rank++
                return (
                  <>
                    <Tr
                      id={item.idx.toString()}
                      textColor={item.staff ? 'blue' : undefined}
                    >
                      <Td textAlign="center">
                        {item.staff ? '-' : rank + '위'}
                      </Td>
                      <Td>{item.studentID}</Td>
                      <Td>
                        {item.name} {item.staff && ' (부원)'}
                      </Td>
                      <Td isNumeric>{formatSeconds(item.seconds)}</Td>
                    </Tr>
                  </>
                )
              })}
            </Tbody>
          </Table>
        </TableContainer>
      </Box>
    </>
  )
}

export async function getServerSideProps() {
  const list = await prisma.leaderboard.findMany({
    orderBy: [{ seconds: 'asc' }],
  })

  return { props: { list: serialize(list) } }
}
