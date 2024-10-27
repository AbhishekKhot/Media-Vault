export async function successHandler(reply, response, customCode) {
  reply.status(200).send({
    ok: true,
    statusCode: customCode || 200,
    data: response,
  });
}
